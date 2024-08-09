"use client";

import { useSession } from "next-auth/react";
import { env } from "@/env";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";

export const AppKnockProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = useSession();

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.data?.user?.id || ""}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};
