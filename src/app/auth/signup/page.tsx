// import { login, signup } from "./actions";

import WordSeparator from "@/app/components/WordSeparator";
import Link from "next/link";
import { login, signup } from "../actions";

export default async function SignUpPage() {
  return (
    // <form>
    //   <label htmlFor="email">Email:</label>
    //   <input id="email" name="email" type="email" required />
    //   <label htmlFor="password">Password:</label>
    //   <input id="password" name="password" type="password" required />
    //   <button formAction={login}>Log in</button>
    //   <button formAction={signup}>Sign up</button>
    // </form>

    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#CAD2C5] font-sans">
      <h1 className="text-4xl font-extrabold mb-4">ta.ai</h1>
      <p className="text-2xl text-center mb-4">Sign up and create your account!</p>
      <div className="flex flex-col bg-white shadow-md rounded-2xl w-[450px] p-12 gap-4">
        <form action={signup} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              required
              type="text"
              name="email"
              placeholder="E.g. someuser@gmail.com"
              className="bg-gray-200 w-full px-4 py-2 border-1 border-gray-300 rounded-md focus:outline-0 focus:outline-[#52796f] focus:border-[#52796f] focus:border-2 focus:bg-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              required
              type="text"
              name="password"
              placeholder="Your password"
              className="bg-gray-200 w-full px-4 py-2 border-1 border-gray-300 rounded-md focus:outline-0 focus:outline-[#52796f] focus:border-[#52796f] focus:border-2 focus:bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2">
              Confirm your password
            </label>
            <input
              required
              type="text"
              name="confirmPassword"
              placeholder="Your password"
              className="bg-gray-200 w-full px-4 py-2 border-1 border-gray-300 rounded-md focus:outline-0 focus:outline-[#52796f] focus:border-[#52796f] focus:border-2 focus:bg-white"
            />
          </div>
          {/* <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="rememberMe">Remember Me?</label>
              <input
                disabled
                type="checkbox"
                name="rememberMe"
                className="cursor-pointer accent-[#2c514c] w-4 h-4"
              />
            </div>
            <Link
              href="/forgotPassword"
              className="hover:underline underline-offset-2 decoration-2 decoration-[#73A8A1]"
            >
              Forgot Password?
            </Link>
          </div> */}
          <button
            type="submit"
            className="bg-[#84a98c] hover:bg-[#52796f] text-white cursor-pointer rounded-md px-4 py-2"
          >
            Sign up
          </button>
        </form>
        <WordSeparator word="Or" />
        {/* <GoogleButton /> */}
        <Link
          href="/auth/login"
          className="text-center hover:underline underline-offset-2 decoration-2 decoration-[#84a98c]"
        >
          Already have an account?
          <br />
          <b className="text-[#84a98c]">Log in</b> here
        </Link>
      </div>
    </div>
  );
}
