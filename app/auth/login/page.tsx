import { login, signup } from "./action/login";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4">
      <label className="flex gap-2" htmlFor="email">
        Email:
        <input id="email" name="email" type="email" required />
      </label>
      <label className="flex gap-2" htmlFor="password">
        Password:
        <input id="password" name="password" type="password" required />
      </label>
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
