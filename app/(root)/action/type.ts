/**
 * Unified API Response Type
 * Used across Supabase, Prisma, and fetch operations
 */
export type ApiResponse<T, E = ApiError> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };

/**
 * Standardized API Error
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  statusCode?: number;
}

/**
 * Error codes for different scenarios
 */
export enum ErrorCode {
  // Authentication errors
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  AUTH_FAILED = "AUTH_FAILED",

  // Database errors
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  DATABASE_ERROR = "DATABASE_ERROR",

  // Validation errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",

  // Network errors
  NETWORK_ERROR = "NETWORK_ERROR",
  FETCH_ERROR = "FETCH_ERROR",

  // Server errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

// Legacy types (for backward compatibility)
export type Result<T, E = globalThis.Error> = {
  data: T;
  error: E;
};

export type Success<T> = Result<T, null>;
export type Failure<E> = Result<null, E>;
