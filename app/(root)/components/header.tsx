"use client";

import { User } from "@supabase/supabase-js";
import { logout } from "../action/logout";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";

interface Props {
  user: User;
}

export default function Header({ user }: Props) {
  return (
    <header className="flex justify-between items-center p-4 sticky bg-inherit border-b border-gray-50 shadow-2xl">
      <Heading level="h1">
        <Link href="/">Job Apply Flow</Link>
      </Heading>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <p className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
            {user.email?.[0]?.toUpperCase()}
          </p>
          <Badge variant="outline" className="px-3 py-1.5 text-sm">
            {user.email}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
