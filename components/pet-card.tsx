"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function PetCard() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const petPhotos = [
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-1",
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-2",
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-3",
    "https://placehold.jp/3d4070/ffffff/800x800.png?text=photo-4",
  ];

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % petPhotos.length);
  };

  const handlePreviousPhoto = () => {
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + petPhotos.length) % petPhotos.length
    );
  };

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="relative w-full max-w-[360px] rounded-2xl bg-white shadow-lg dark:bg-gray-800 mt-4">
      <div className="relative h-[400px] overflow-hidden rounded-t-2xl">
        <Carousel className="w-full h-full">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center"
            onClick={handlePreviousPhoto}
          >
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center"
            onClick={handleNextPhoto}
          >
            <ChevronRightIcon className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">Buddy, 5</h2>
          <p className="text-sm">
            Loves playing fetch, cuddling, and going on walks.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center"
          >
            <HeartIcon className="h-6 w-6 text-red-500" />
            <span className="sr-only">Dislike</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center"
          >
            <HeartIcon className="h-6 w-6 text-green-500" />
            <span className="sr-only">Like</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center"
          onClick={toggleDescriptionVisibility}
        >
          <ChevronDownIcon className="h-6 w-6" />
          <span className="sr-only">Toggle description</span>
        </Button>
      </div>
      {isDescriptionVisible && (
        <div className="p-4">
          <h3 className="text-lg font-semibold">About Buddy</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            I&apos;m an energetic pup who loves to play and explore. When
            I&apos;m not running around the park, you can find me cuddled up on
            the couch watching movies with my favorite human. I&apos;m looking
            for an owner who is just as adventurous as I am and who will give me
            all the love and attention I deserve.
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
