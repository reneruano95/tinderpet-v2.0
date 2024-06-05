import { useState } from "react";
import Image from "next/image";
import { HeartIcon, Info, X } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

export default function PetCard() {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const petPhotos = [
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-1",
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-2",
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-3",
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-4",
  ];

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="relative w-full max-w-xs md:max-w-[360] rounded-2xl shadow-lg mt-4">
      <div className="relative h-[400px] overflow-hidden rounded-t-2xl">
        <Carousel className="relative w-full h-full">
          <CarouselContent>
            {petPhotos.map((photo, index) => (
              <CarouselItem key={index} className="p-0">
                <Image
                  src={photo}
                  alt={`Pet Photo ${index + 1}`}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="z-10 left-5" />
          <CarouselNext className="z-10 right-5" />
        </Carousel>

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">Buddy, 5</h2>
          <p className="text-sm">
            Loves playing fetch, cuddling, and going on walks.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center rounded-full hover:rounded-full"
        >
          <X className="h-6 w-6 stroke-red-500" />
          <span className="sr-only">Dislike</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center rounded-full hover:rounded-full"
        >
          <HeartIcon className="h-6 w-6 stroke-green-500" />
          <span className="sr-only">Like</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center rounded-full hover:rounded-full"
          onClick={toggleDescriptionVisibility}
        >
          <Info className="h-6 w-6 stroke-gray-500" />
          <span className="sr-only">Toggle description</span>
        </Button>
      </div>
      {isDescriptionVisible && (
        <div className="p-4">
          <h3 className="text-lg font-semibold">About Buddy</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Buddy is an energetic pup who loves to play and explore. He&apos;s
            always up for an adventure and enjoys cuddling on the couch.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Playful
            </div>
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Cuddly
            </div>
            <div className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              Adventurous
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
