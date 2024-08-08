import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatToDollar, getImageUrl } from "@/lib/utils";
import { Item } from "@/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card key={item.id}>
      <CardHeader>
        <Image
          src={getImageUrl(item.fileKey)}
          alt={item.name}
          width={300}
          height={300}
          className="rounded-lg"
        />
        <CardTitle className="capitalize">{item.name}</CardTitle>
      </CardHeader>
      <CardContent>Price: {formatToDollar(item.startingPrice)}</CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild>
          <Link href={`/items/${item.id}`}>Place Bid</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
