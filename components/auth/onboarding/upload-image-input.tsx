import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function UploadImageInput({ ...props }: any) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    if (acceptedFiles.length === 0) {
      console.log("Too many files");
      toast.error("Too many files");
      return;
    }

    if (!acceptedFiles[0].type.startsWith("image")) {
      console.log("Not an image");
      toast.error("Not an image");
      return;
    }

    file.readAsDataURL(acceptedFiles[0]);

    file.onerror = function () {
      setPreview(null);
      console.log("There was an error reading the file");
    };
    console.log(acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      onDrop,
      accept: { "image/*": [] },
    });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files);
    }
    console.log("onchange");
  };

  return (
    <div
      {...getRootProps()}
      className="col-span-2  bg-slate-300 h-32 rounded-lg border-zinc-600 border-dashed border-2 dark:bg-slate-700"
    >
      <Input
        {...getInputProps()}
        type="file"
        className={cn(preview ? "hidden" : "", "cursor-pointer")}
        {...props}
        onChange={onChange}
      />
      {!preview && !isDragActive && (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {!preview && isDragActive && <p>Drop the files here ...</p>}

      {preview && (
        <Image
          className="w-full h-full object-contain"
          src={preview as string}
          alt="Upload preview"
          width={1000}
          height={1000}
        />
      )}
    </div>
  );
}
