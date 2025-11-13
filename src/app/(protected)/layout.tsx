import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Forge",
};

export default function ProtectedLayout({ children }: Readonly<LayoutProps>) {
  const session = auth.api.getSession;

  if (!session || session === null) {
    redirect("/auth/signin");
  }

  return children;
}
