// "use client"

// This is the old page, use this for the styling and customize if needed

import Link from "next/link";
import WordSeparator from "@/app/components/WordSeparator";
import GoogleButton from "@/app/components/GoogleButton";

export default async function SignIn() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Todo List</h1>
      {/* <p>Create your account</p> */}
      <p className="text-2xl text-center mb-4">Sign in to your account</p>
      {/* <Suspense> */}
      <div className="flex flex-col bg-[#232323] border-dark-outline border-2 rounded-2xl w-[450px] p-12 gap-4">
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="usernameOrEmail" className="mb-2">
              Username or email
            </label>
            <input
              disabled
              type="text"
              name="usernameOrEmail"
              placeholder="E.g. someuser@gmail.com"
              className="bg-[#1d1d1d] w-full px-4 py-2 border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-[#383838] dark:bg-background dark:text-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              disabled
              type="text"
              name="password"
              placeholder="Your password"
              className="bg-[#1d1d1d] w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-[#383838] dark:bg-background dark:text-white"
            />
          </div>
          <div className="flex flex-row justify-between">
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
          </div>
          <button
            type="submit"
            className="bg-[#2c514c] hover:bg-[#1E3835] cursor-pointer rounded-md px-4 py-2"
          >
            Log in
          </button>
        </form>
        <WordSeparator word="Or" />
        <GoogleButton />
        <Link
          href="/signup"
          className="text-center hover:underline underline-offset-2 decoration-2 decoration-[#73A8A1]"
        >
          Don&apos;t have an account?
          <br />
          <b className="text-[#73A8A1]">Sign up</b> here
        </Link>
      </div>
    </div>
  );
}
