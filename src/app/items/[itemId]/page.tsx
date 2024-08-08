import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { formatToDollar, getImageUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date());
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  const bids = [];

  // const bids = [
  //   {
  //     id: 1,
  //     amount: 100,
  //     userName: "Alice",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 2,
  //     amount: 200,
  //     userName: "Bob",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 3,
  //     amount: 250,
  //     userName: "Charlie",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 4,
  //     amount: 400,
  //     userName: "David",
  //     timestamp: new Date(),
  //   },
  // ];

  const hasBids = bids.length > 0;

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

        <div className="flex-1 space-y-8">
          <h2 className="text-2xl font-bold">Current Bids</h2>
          {hasBids ? (
            <ul className="space-y-2">
              {bids.map((bid) => (
                <li key={bid.id} className="rounded-xl bg-gray-200 p-8">
                  <div className="flex justify-between gap-4 space-x-1">
                    <div className="space-x-1 font-bold">
                      <span>{formatToDollar(bid.amount)}</span>
                      <span className="font-normal">by</span>
                      <span>{bid.userName}</span>
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
              <Button>Place a Bid</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
