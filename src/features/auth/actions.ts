"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function serverSignUp(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const payload = {
    username,
    email,
    name: "", // Skip name requirement during signup
    password,
    confirmPassword,
  };

  console.log(payload);

  try {
    await auth.api.signUpEmail({ body: payload });
  } catch (error: unknown) {
    console.log("An error has occurred", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function serverSignIn(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInUsername({
      body: {
        username,
        password,
        callbackURL: "/",
      },
      headers: await headers(),
    });

    console.log("Logged In:", username);
  } catch (error: unknown) {
    console.log("An error has occurred", error);
    return { error: true, message: "Internal Server Error" };
  }
}

export async function serverSignOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    return { error: true, message: "Internal Server Error" };
  }
}
