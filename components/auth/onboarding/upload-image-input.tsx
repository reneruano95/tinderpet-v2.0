import { useCallback, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { CloudUpload, LoaderCircle, X } from "lucide-react";
import { toast } from "sonner";

import { deleteImage, getImageUrl, uploadImage } from "@/lib/actions/images";

interface UploadImageInputProps {
  bucket: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}
export default function UploadImageInput({
  bucket,
  value,
  onChange,
}: UploadImageInputProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (value) {
      startTransition(() =>
        getImageUrl({ bucketName: bucket, filePath: value }).then(setImageUrl)
      );
    }
  }, [value]);

  const handleClear = async () => {
    const result = await deleteImage({
      bucketName: bucket,
      filePath: value,
    });
    console.log(imageUrl);
    console.log(result);
    setImageUrl("");
    onChange("");
  };

  const handleSelectedImage = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    try {
      const result = await uploadImage({ bucketName: bucket, file });
      onChange(result);
    } catch (error) {
      toast.error("An error occurred while uploading the image", {
        duration: 5000,
      });
    }
  };

  if (isPending) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-slate-500" />
        <p className="sr-only">Uploading...</p>
      </div>
    );
  }

  if (value) {
    return (
      <div className="relative w-full h-32">
        {imageUrl && (
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt="photo-2"
            className="w-full h-full rounded-lg object-cover md:object-scale-down"
          />
        )}
        <button
          onClick={handleClear}
          className="absolute top-0 right-0 bg-rose-500 rounded-full text-white p-1 shadow-sm hover:bg-rose-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-32">
      <input
        type="file"
        id="custom-input"
        accept="image/*"
        onChange={handleSelectedImage}
        hidden
      />
      <label
        htmlFor="custom-input"
        className="flex flex-col justify-center items-center w-full h-full text-slate-500 py-2 px-4 rounded-md border-zinc-600 border-dashed border-2 font-semibold bg-slate-300 hover:bg-slate-400 cursor-pointer"
      >
        <CloudUpload className="w-6 h-6 mb-3" />
        <p className="mb-2 text-xs text-center dark:text-slate-400">
          Click to upload
        </p>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF
        </p>
      </label>
    </div>
  );
}
