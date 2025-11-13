"use client";

import { ComponentPropsWithRef, useState } from "react";
import { serverSignUp } from "../actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await serverSignUp(formData);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
      redirect("/auth/signin");
    }
  }

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="space-y-4 w-80">
        <div className="grid space-y-1">
          <h1 className="text-lg font-bold">Sign Up</h1>
          <p className="text-sm text-white/70">
            Enter your information to create an account
          </p>
        </div>

        <hr className="border-neutral-700" />

        <form action={handleSubmit} className="grid space-y-3">
          <div className="grid space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" name="username" disabled={loading} required />
          </div>
          <div className="grid space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" disabled={loading} required />
          </div>
          <div className="grid space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>
          <div className="grid space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="password"
              autoComplete="new-password"
              name="confirmPassword"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 text-sm font-medium cursor-pointer mt-4"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-sm text-white/70">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-white hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

function Input({ type, ...props }: ComponentPropsWithRef<"input">) {
  return (
    <input
      className="border border-neutral-700 px-2 py-1"
      type={type}
      {...props}
    />
  );
}

function Label({ ...props }: ComponentPropsWithRef<"label">) {
  return <label className="text-sm font-medium text-white " {...props} />;
}
