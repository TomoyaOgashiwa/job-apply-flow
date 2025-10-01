"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../action/login";
import { Button } from "@/components/shadcn/button";

const initialState: LoginState = {
  fieldErrors: {},
  supabaseError: "",
  values: { email: "" },
  success: false,
};

export default function LoginForm() {
  // React 19: useActionState returns [state, action, isPending]
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e.g. jane@doe.com"
          defaultValue={state.values?.email ?? ""}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={
            state.fieldErrors?.email ? "email-error" : undefined
          }
          className="rounded border px-3 py-2"
          autoComplete="email"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" role="alert" className="text-sm text-red-600">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          aria-invalid={Boolean(state.fieldErrors?.password)}
          aria-describedby={
            state.fieldErrors?.password ? "password-error" : undefined
          }
          className="rounded border px-3 py-2"
          autoComplete="current-password"
        />
        {state.fieldErrors?.password && (
          <p id="password-error" role="alert" className="text-sm text-red-600">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      {/* Supabase error (only shown when Zod passed) */}
      {state.supabaseError && (
        <div
          role="alert"
          className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {state.supabaseError}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
