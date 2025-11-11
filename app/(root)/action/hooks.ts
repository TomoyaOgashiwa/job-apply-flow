"use client";

import { useState, useCallback } from "react";
import type { ApiResponse, ApiError } from "./type";
import { isSuccess } from "./utils";

/**
 * State for async operations
 */
export interface AsyncState<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
  success: boolean;
}

/**
 * Hook for handling API responses with loading states
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, error, loading, execute } = useApiRequest(getApplications);
 *
 *   useEffect(() => {
 *     execute();
 *   }, []);
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (data) return <div>{data.length} applications</div>;
 * }
 * ```
 */
export function useApiRequest<T, Args extends unknown[]>(
  apiFunction: (...args: Args) => Promise<ApiResponse<T>>,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    success: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);

        if (isSuccess(response)) {
          setState({
            data: response.data,
            error: null,
            loading: false,
            success: true,
          });
          return response.data;
        } else {
          setState({
            data: null,
            error: response.error,
            loading: false,
            success: false,
          });
          return null;
        }
      } catch (err) {
        const error: ApiError = {
          code: "UNKNOWN_ERROR",
          message:
            err instanceof Error ? err.message : "An unknown error occurred",
          details: err,
        };
        setState({
          data: null,
          error,
          loading: false,
          success: false,
        });
        return null;
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      success: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook for handling mutations (create, update, delete operations)
 * Similar to useApiRequest but designed for mutations with separate idle state
 *
 * @example
 * ```tsx
 * function CreateApplicationForm() {
 *   const { mutate, loading, error, success } = useMutation(createApplication);
 *
 *   const handleSubmit = async (data) => {
 *     const result = await mutate(data);
 *     if (result) {
 *       toast.success("Application created!");
 *     }
 *   };
 * }
 * ```
 */
export function useMutation<T, Args extends unknown[]>(
  apiFunction: (...args: Args) => Promise<ApiResponse<T>>,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    success: false,
  });

  const mutate = useCallback(
    async (...args: Args) => {
      setState({
        data: null,
        error: null,
        loading: true,
        success: false,
      });

      try {
        const response = await apiFunction(...args);

        if (isSuccess(response)) {
          setState({
            data: response.data,
            error: null,
            loading: false,
            success: true,
          });
          return response.data;
        } else {
          setState({
            data: null,
            error: response.error,
            loading: false,
            success: false,
          });
          return null;
        }
      } catch (err) {
        const error: ApiError = {
          code: "UNKNOWN_ERROR",
          message:
            err instanceof Error ? err.message : "An unknown error occurred",
          details: err,
        };
        setState({
          data: null,
          error,
          loading: false,
          success: false,
        });
        return null;
      }
    },
    [apiFunction],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      success: false,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

/**
 * Hook for handling optimistic updates
 * Updates UI immediately while the API call is in progress
 *
 * @example
 * ```tsx
 * function TodoList() {
 *   const [todos, setTodos] = useState([]);
 *   const { execute } = useOptimisticUpdate(
 *     deleteTodo,
 *     (id) => setTodos(prev => prev.filter(t => t.id !== id)),
 *     (id) => setTodos(originalTodos)
 *   );
 *
 *   const handleDelete = (id) => {
 *     execute(id);
 *   };
 * }
 * ```
 */
export function useOptimisticUpdate<T, Args extends unknown[]>(
  apiFunction: (...args: Args) => Promise<ApiResponse<T>>,
  optimisticUpdate: (...args: Args) => void,
  rollback: (...args: Args) => void,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
    success: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      // Apply optimistic update immediately
      optimisticUpdate(...args);
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);

        if (isSuccess(response)) {
          setState({
            data: response.data,
            error: null,
            loading: false,
            success: true,
          });
          return response.data;
        } else {
          // Rollback on error
          rollback(...args);
          setState({
            data: null,
            error: response.error,
            loading: false,
            success: false,
          });
          return null;
        }
      } catch (err) {
        // Rollback on exception
        rollback(...args);
        const error: ApiError = {
          code: "UNKNOWN_ERROR",
          message:
            err instanceof Error ? err.message : "An unknown error occurred",
          details: err,
        };
        setState({
          data: null,
          error,
          loading: false,
          success: false,
        });
        return null;
      }
    },
    [apiFunction, optimisticUpdate, rollback],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      success: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
