"use client";

import { ComponentPropsWithRef } from "react";
import { useRouter } from "next/navigation";
import { serverSignIn } from "../actions";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();

  async function handleSubmit(data: FormData) {
    try {
      await serverSignIn(data);
    } catch (error: unknown) {
      console.log("An error has ocurred", error);
    } finally {
      router.push("/");
    }

    // const username = data.get("username") as string;
    // const password = data.get("password") as string;

    // try {
    //   await authClient.signIn.username({
    //     username,
    //     password,
    //     callbackURL: "/",
    //     fetchOptions: {
    //       onSuccess() {
    //         router.push("/");
    //       },
    //     },
    //   });
    // } catch (error: unknown) {
    //   console.log(error);
    // }
  }

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="space-y-4 w-80">
        <div className="grid space-y-1">
          <h1 className="text-lg font-bold">Sign In</h1>
          <p className="text-sm text-white/70">
            Enter your information below to sign in
          </p>
        </div>

        <hr className="border-neutral-700" />

        <form action={handleSubmit} className="grid space-y-3">
          <div className="grid space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              className="disabled:opacity-50"
              required
            />
          </div>
          <div className="grid space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              className="disabled:opacity-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 text-sm font-medium cursor-pointer disabled:opacity-50 mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-sm text-white/70">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}

function Input({ className, type, ...props }: ComponentPropsWithRef<"input">) {
  return (
    <input
      className={`border border-neutral-700 px-2 py-1 ${className}`}
      type={type}
      {...props}
    />
  );
}

function Label({ ...props }: ComponentPropsWithRef<"label">) {
  return <label className="text-sm font-medium text-white " {...props} />;
}
