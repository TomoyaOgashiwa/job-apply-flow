import Heading from "@/components/ui/heading";
import Link from "next/link";
import SignupForm from "./components/signup-form";
import { Button } from "@/components/shadcn/button";
import { loginWithGoogle } from "../action/google-auth";

export default function SignupPage() {
  return (
    <div className="border border-gray-200 rounded-md p-8 flex flex-col gap-6 w-2/3 m-auto">
      <Heading level="h2">Login</Heading>
      <div className="flex flex-col gap-4">
        <SignupForm />
        <Button onClick={loginWithGoogle} className="w-full">
          Continue with Google
        </Button>
      </div>
      <p className="text-sm text-center">
        Do you have an account?{" "}
        <Link className="text-blue-500" href="/auth/signup">
          Login
        </Link>
      </p>
    </div>
  );
}
