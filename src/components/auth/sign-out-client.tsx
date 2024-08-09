"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

export function SignOutClient() {
  return (
    <Button
      type="submit"
      className="space-x-2"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <span>Sign Out</span>
    </Button>
  );
}
