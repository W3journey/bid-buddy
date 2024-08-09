import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { formatToDollar, getImageUrl } from "@/lib/utils";
import { createBidAction } from "@/app/items/[itemId]/actions";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { auth, signIn } from "@/auth";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date());
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const session = await auth();
  const item = await getItem(parseInt(itemId));
  const allBids = await getBidsForItem(parseInt(itemId));
  const hasBids = allBids.length > 0;

  if (!item) {
    return (
      <div className="mt-12 flex flex-col items-center space-y-8">
        <Image src={"/package.svg"} alt={"Package"} width={200} height={200} />
        <PageTitle>Item not found</PageTitle>
        <p className="text-center">
          The item you&apos;re trying to view is invalid. <br /> Please go back
          and search for a different auction item.
        </p>
        <Button asChild>
          <Link href={"/"}>View Auctions</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="space-y-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-6">
          <PageTitle className="normal-case">
            <span className="font-normal">Auction for</span>{" "}
            <span className="capitalize">{item.name}</span>
          </PageTitle>
          <Image
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={400}
            height={400}
            className="rounded-lg"
          />
          <div className="space-y-4 text-xl">
            <div>
              Current Bid:{" "}
              <span className="font-bold">
                {formatToDollar(item.currentBid)}
              </span>
            </div>
            <div>
              Starting Price of{" "}
              <span className="font-bold">
                {formatToDollar(item.startingPrice)}
              </span>
            </div>
            <div>
              Bid Interval{" "}
              <span className="font-bold">
                {formatToDollar(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Current Bids</h2>
            <form
              action={
                session?.user
                  ? createBidAction.bind(null, parseInt(itemId))
                  : async () => {
                      "use server";
                      await signIn();
                    }
              }
            >
              <Button type="submit">Place a Bid</Button>
            </form>
          </div>
          {hasBids ? (
            <ul className="space-y-2">
              {allBids.map((bid) => (
                <li key={bid.id} className="rounded-xl bg-gray-200 p-8">
                  <div className="flex justify-between gap-4 space-x-1">
                    <div className="space-x-1 font-bold">
                      <span>{formatToDollar(bid.amount)}</span>
                      <span className="font-normal">by</span>
                      <span>{bid.user.name}</span>
                    </div>
                    <span>{formatTimestamp(bid.timestamp)} ago</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-8 rounded-lg bg-gray-200 p-12">
              <Image
                src={"/no_bids.svg"}
                alt={"No Bids"}
                width={200}
                height={200}
              />
              <h2 className="text-2xl font-bold">No bids yet</h2>
              <form
                action={
                  session?.user
                    ? createBidAction.bind(null, parseInt(itemId))
                    : async () => {
                        "use server";
                        await signIn();
                      }
                }
              >
                <Button type="submit">Place a Bid</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
