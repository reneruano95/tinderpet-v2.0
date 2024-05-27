import { createClient } from "@/lib/supabase/client";
import { getUser } from "./auth";

export async function getImageUrl({
  bucketName,
  filePath,
}: {
  bucketName: string;
  filePath: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await getUser();

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${user?.id}/${filePath}`);

  return data.publicUrl;
}

export async function uploadImage({
  bucketName,
  file,
}: {
  bucketName: string;
  file: File | undefined;
}) {
  const supabase = createClient();
  if (!file) {
    return;
  }

  const {
    data: { user },
  } = await getUser();

  const fileExt = file.name.split(".").pop();
  const fileName = `${user?.id}${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(`${user?.id}/${filePath}`, file);

  if (error) {
    throw error;
  }
  return filePath;
}

export async function deleteImage({
  bucketName,
  filePath,
}: {
  bucketName: string;
  filePath: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucketName).remove([filePath]);
  if (error) {
    throw error;
  }

  return filePath;
}

export async function moveImage({
  bucketName,
  filePath,
  newFilePath,
}: {
  bucketName: string;
  filePath: string;
  newFilePath: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(bucketName)
    .move(filePath, newFilePath);
  if (error) {
    throw error;
  }
  return newFilePath;
}
