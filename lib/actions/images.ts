import { createClient } from "../supabase/server";
import { getUser } from "./auth";
const supabase = createClient();
export async function getImageUrl({
  bucketName,
  filePath,
}: {
  bucketName: string;
  filePath: string;
}) {
  const { data } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadImage({
  bucketName,
  file,
}: {
  bucketName: string;
  file: File;
}) {
  if (!file) {
    return;
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

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
  const { error } = await supabase.storage
    .from(bucketName)
    .move(filePath, newFilePath);
  if (error) {
    throw error;
  }
  return newFilePath;
}
