import Link from "next/link";
import { login, loginWithGoogle } from "./action/login";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="border border-gray-200 rounded-md p-8 flex flex-col gap-6 w-2/3 m-auto">
      <h2 className="text-xl font-bold">Login</h2>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-2" htmlFor="email">
          Email:
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="E.G. example@google.com"
          />
        </label>
        <label className="flex flex-col gap-2" htmlFor="password">
          Password:
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="E.G. paSSw0rd"
          />
        </label>
        <Button formAction={login}>Log in</Button>
        <Button onClick={loginWithGoogle}>Login with Google</Button>
      </form>
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link className="text-blue-500" href="/auth/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
