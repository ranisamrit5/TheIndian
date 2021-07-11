import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  console.log('Storage::',file)
  const filename = `${Date.now()}-${file.fileName}`;
  const stored = await Storage.put(filename, file, {
    contentType: file.type
  });
console.log('STORED::',stored)
  return stored;
}