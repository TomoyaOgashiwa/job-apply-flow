import { login, loginWithGoogle, signup } from "./action/login";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2>Login</h2>
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
      <button onClick={loginWithGoogle} type="button">
        Login with Google
      </button>
    </div>
  );
}
