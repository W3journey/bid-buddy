"use client";
import { SignInClient } from "@/components/auth/sign-in-client";
import { SignOutClient } from "@/components/auth/sign-out-client";
import { formatToDollar } from "@/lib/utils";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const links = [
  {
    id: 1,
    href: "/",
    label: "All Auctions",
    onlyDisplayIfSignedIn: false,
  },
  {
    id: 2,
    href: "/items/create",
    label: "Create Auction",
    onlyDisplayIfSignedIn: true,
  },
  {
    id: 3,
    href: "/auctions",
    label: "My Auctions",
    onlyDisplayIfSignedIn: true,
  },
];

type NotificationItem = {
  item: {
    data: {
      itemId: number;
      itemName: string;
    };
  };
};

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const user = session.data?.user;

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="flex items-center gap-1 hover:underline">
            <Image src="/logo.png" width={"50"} height={"50"} alt="Logo" />
            BidBuddy.com
          </Link>
          <div className="flex items-center gap-8">
            {links.map((link) => {
              const shouldDisplay = !link.onlyDisplayIfSignedIn || user;

              return shouldDisplay ? (
                <Link
                  key={link.id}
                  href={link.href}
                  className="flex items-center gap-1 hover:underline"
                >
                  {link.label}
                </Link>
              ) : null;
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            renderItem={({ item, ...props }) => (
              <NotificationCell {...props} item={item}>
                <div className="rounded-xl">
                  <Link
                    className="hover:text=blue-500 text-blue-400"
                    onClick={() => {
                      setIsVisible(false);
                    }}
                    href={`/items/${item.data?.itemId}`}
                  >
                    Someone outbid you on{" "}
                    <span className="font-bold">{item.data?.itemName}</span> by{" "}
                    {formatToDollar(item.data?.bidAmount)}
                  </Link>
                </div>
              </NotificationCell>
            )}
          />
          <div>{session?.data?.user?.name}</div>
          <div>{user ? <SignOutClient /> : <SignInClient />}</div>
        </div>
      </div>
    </div>
  );
}
