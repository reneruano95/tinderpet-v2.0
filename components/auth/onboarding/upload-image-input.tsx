import { Input } from "@/components/ui/input";
import { getImageUrl, uploadImage } from "@/lib/actions/images";
import { cn } from "@/lib/utils";
import { CloudUpload, ImageUp, PawPrint } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface UploadImageInputProps {
  bucket: string;
  value: string;
  onChange: (value: string | undefined) => void;
}
export default function UploadImageInput({
  bucket,
  value,
  onChange,
}: UploadImageInputProps) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (value) {
      getImageUrl({ bucketName: bucket, filePath: value }).then(setImageUrl);
    }
  }, [value]);

  const handleClear = () => {
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

  if (value) {
    return (
      <div className="w-full h-32 border border-gray-300 rounded-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            width={100}
            height={100}
            alt="photo-2"
            className="w-full h-full rounded-lg object-contain"
          />
        )}
        <button onClick={handleClear}>Clear</button>
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
        <p className="mb-2 text-xs dark:text-slate-400">Click to upload</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SVG, PNG, JPG or GIF
        </p>
      </label>
    </div>
  );
}
