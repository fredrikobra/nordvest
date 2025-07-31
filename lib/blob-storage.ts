import { put, del, list } from "@vercel/blob"

export async function uploadToBlob(file: File, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
    return blob
  } catch (error) {
    console.error("Error uploading to blob:", error)
    throw error
  }
}

export async function deleteFromBlob(url: string) {
  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
  } catch (error) {
    console.error("Error deleting from blob:", error)
    throw error
  }
}

export async function listBlobFiles(prefix?: string) {
  try {
    const { blobs } = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
    return blobs
  } catch (error) {
    console.error("Error listing blob files:", error)
    throw error
  }
}
