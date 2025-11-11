import { Prisma } from "@/libs/generated/prisma";
import { PostgrestError } from "@supabase/supabase-js";
import { ZodError } from "zod";
import type { ApiResponse, ApiError } from "./type";
import { ErrorCode } from "./type";

/**
 * Creates a successful API response
 */
export function success<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    error: null,
  };
}

/**
 * Creates an error API response
 */
export function error<T = never>(
  code: string,
  message: string,
  details?: unknown,
  statusCode?: number,
): ApiResponse<T> {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
      details,
      statusCode,
    },
  };
}

/**
 * Converts Supabase error to ApiError
 */
export function fromSupabaseError(err: PostgrestError | Error): ApiError {
  if ("code" in err && "details" in err) {
    // PostgrestError
    const postgrestError = err as PostgrestError;
    return {
      code: postgrestError.code || ErrorCode.DATABASE_ERROR,
      message: postgrestError.message,
      details: postgrestError.details,
      statusCode: 500,
    };
  }

  // Generic Error
  return {
    code: ErrorCode.DATABASE_ERROR,
    message: err.message,
    details: err,
    statusCode: 500,
  };
}

/**
 * Converts Prisma error to ApiError
 * prisma error code: https://www.prisma.io/docs/orm/reference/error-reference
 */
export function fromPrismaError(err: unknown): ApiError {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return {
          code: ErrorCode.ALREADY_EXISTS,
          message: "A record with this unique field already exists",
          details: err.meta,
          statusCode: 409,
        };
      case "P2025":
        return {
          code: ErrorCode.NOT_FOUND,
          message: "Record not found",
          details: err.meta,
          statusCode: 404,
        };
      case "P2003":
        return {
          code: ErrorCode.VALIDATION_ERROR,
          message: "Foreign key constraint failed",
          details: err.meta,
          statusCode: 400,
        };
      default:
        return {
          code: ErrorCode.DATABASE_ERROR,
          message: err.message,
          details: { code: err.code, meta: err.meta },
          statusCode: 500,
        };
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return {
      code: ErrorCode.VALIDATION_ERROR,
      message: "Validation error occurred",
      details: err.message,
      statusCode: 400,
    };
  }

  if (err instanceof Error) {
    return {
      code: ErrorCode.DATABASE_ERROR,
      message: err.message,
      details: err,
      statusCode: 500,
    };
  }

  return {
    code: ErrorCode.UNKNOWN_ERROR,
    message: "An unknown error occurred",
    details: err,
    statusCode: 500,
  };
}

/**
 * Converts Zod validation error to ApiError
 */
export function fromZodError(err: ZodError): ApiError {
  return {
    code: ErrorCode.VALIDATION_ERROR,
    message: "Validation failed",
    details: err.issues.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    })),
    statusCode: 400,
  };
}

/**
 * Converts fetch error to ApiError
 */
export function fromFetchError(err: unknown): ApiError {
  if (err instanceof TypeError && err.message.includes("fetch")) {
    return {
      code: ErrorCode.NETWORK_ERROR,
      message: "Network error occurred",
      details: err.message,
      statusCode: 0,
    };
  }

  if (err instanceof Error) {
    return {
      code: ErrorCode.FETCH_ERROR,
      message: err.message,
      details: err,
      statusCode: 0,
    };
  }

  return {
    code: ErrorCode.UNKNOWN_ERROR,
    message: "An unknown error occurred",
    details: err,
    statusCode: 0,
  };
}

/**
 * Wraps Prisma operations with error handling
 */
export async function withPrisma<T>(
  operation: () => Promise<T>,
): Promise<ApiResponse<T>> {
  try {
    const data = await operation();
    return success(data);
  } catch (err) {
    const apiError = fromPrismaError(err);
    return error(
      apiError.code,
      apiError.message,
      apiError.details,
      apiError.statusCode,
    );
  }
}

/**
 * Wraps Supabase operations with error handling
 */
export async function withSupabase<T>(
  operation: () => Promise<{
    data: T | null;
    error: PostgrestError | Error | null;
  }>,
): Promise<ApiResponse<T>> {
  try {
    const { data, error: err } = await operation();

    if (err) {
      const apiError = fromSupabaseError(err);
      return error(
        apiError.code,
        apiError.message,
        apiError.details,
        apiError.statusCode,
      );
    }

    if (data === null) {
      return error(ErrorCode.NOT_FOUND, "No data returned", undefined, 404);
    }

    return success(data);
  } catch (err) {
    const apiError =
      err instanceof Error
        ? fromSupabaseError(err)
        : {
            code: ErrorCode.UNKNOWN_ERROR,
            message: "Unknown error",
            statusCode: 500,
          };
    return error(
      apiError.code,
      apiError.message,
      apiError.details,
      apiError.statusCode,
    );
  }
}

/**
 * Wraps fetch operations with error handling
 */
export async function withFetch<T>(
  operation: () => Promise<Response>,
): Promise<ApiResponse<T>> {
  try {
    const response = await operation();

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorDetails: unknown;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errorDetails = errorData;
      } catch {
        // If parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }

      return error(
        response.status === 404
          ? ErrorCode.NOT_FOUND
          : response.status === 401
            ? ErrorCode.UNAUTHORIZED
            : response.status === 403
              ? ErrorCode.FORBIDDEN
              : ErrorCode.FETCH_ERROR,
        errorMessage,
        errorDetails,
        response.status,
      );
    }

    const data = (await response.json()) as T;
    return success(data);
  } catch (err) {
    const apiError = fromFetchError(err);
    return error(
      apiError.code,
      apiError.message,
      apiError.details,
      apiError.statusCode,
    );
  }
}

/**
 * Type guard to check if response is successful
 */
export function isSuccess<T>(
  response: ApiResponse<T>,
): response is { success: true; data: T; error: null } {
  return response.success === true;
}

/**
 * Type guard to check if response is error
 */
export function isError<T>(
  response: ApiResponse<T>,
): response is { success: false; data: null; error: ApiError } {
  return response.success === false;
}
