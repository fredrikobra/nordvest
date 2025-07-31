import { put, del, list } from "@vercel/blob"

export class BlobService {
  static async uploadFile(file: File, folder = "projects"): Promise<string> {
    try {
      const filename = `${folder}/${Date.now()}-${file.name}`
      const blob = await put(filename, file, {
        access: "public",
      })
      return blob.url
    } catch (error) {
      console.error("File upload error:", error)
      throw new Error("Kunne ikke laste opp fil")
    }
  }

  static async deleteFile(url: string): Promise<void> {
    try {
      await del(url)
    } catch (error) {
      console.error("File delete error:", error)
      throw new Error("Kunne ikke slette fil")
    }
  }

  static async listFiles(folder = "projects") {
    try {
      const { blobs } = await list({
        prefix: folder,
      })
      return blobs
    } catch (error) {
      console.error("File list error:", error)
      throw new Error("Kunne ikke hente filliste")
    }
  }

  static async uploadProjectImage(file: File, projectId: string): Promise<string> {
    return this.uploadFile(file, `projects/${projectId}`)
  }

  static async uploadDocument(file: File, projectId: string): Promise<string> {
    return this.uploadFile(file, `documents/${projectId}`)
  }
}
