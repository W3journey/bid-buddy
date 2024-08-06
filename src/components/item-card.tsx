import Image from "next/image";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { Item } from "@/db/schema";

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
      <CardFooter>Price: {formatPrice(item.startingPrice)}</CardFooter>
    </Card>
  );
};
