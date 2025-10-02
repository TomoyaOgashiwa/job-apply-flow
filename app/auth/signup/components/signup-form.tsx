"use client";

import { useActionState } from "react";
import { Button } from "@/components/shadcn/button";
import { signup, type SignupState } from "../action/signup";

const initialState: SignupState = {
  fieldErrors: {},
  supabaseError: "",
  values: { name: "", email: "", password: "", confirmPassword: "" },
  success: false,
};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Jane Doe"
          defaultValue={state.values?.name ?? ""}
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className="rounded border px-3 py-2"
          autoComplete="name"
        />
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

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium">
          Password(Confirm)
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="At least 8 characters"
          aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
          aria-describedby={
            state.fieldErrors?.confirmPassword
              ? "confirmPassword-error"
              : undefined
          }
          className="rounded border px-3 py-2"
          autoComplete="current-password"
        />
        {state.fieldErrors?.confirmPassword && (
          <p
            id="confirmPassword-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {state.fieldErrors.confirmPassword}
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
        {isPending ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
