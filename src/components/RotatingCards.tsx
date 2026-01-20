import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Dispatch, SetStateAction } from "react";

function RotatingCards({
  totalPages = 0,
  setSelectedPages,
  selectedPages,
}: {
  totalPages?: number;
  setSelectedPages: Dispatch<SetStateAction<number[]>>;
  selectedPages: number[];
}) {
  return (
    <Carousel
      opts={{ align: "center",  }}
      className="w-30 sm:w-60 md:w-90 lg:w-120 p-2"
    >
     <CarouselContent className="">
        {Array.from({ length: totalPages }).map((_, index) => (
          <CarouselItem
            key={index}
            className="flex-none w-28 cursor-pointer"
            onClick={() =>
              setSelectedPages((prev) =>
                prev.includes(index + 1)
                  ? prev.filter((p) => p !== index + 1)
                  : [...prev, index + 1],
              )
            }
          >
            <div className="">
              <Card
                className={
                  selectedPages.includes(index + 1)
                    ? "border-sidebar-accent-foreground border-2"
                    : ""
                }
              >
                <CardContent className="h-32 w-28 flex items-center justify-center pl-0">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default RotatingCards;
