import { put, del, list } from "@vercel/blob"

export class BlobService {
  static async uploadFile(file: File, folder = "projects") {
    try {
      const filename = `${folder}/${Date.now()}-${file.name}`
      const blob = await put(filename, file, {
        access: "public",
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: file.size,
        type: file.type,
      }
    } catch (error) {
      console.error("Blob upload error:", error)
      throw new Error("Kunne ikke laste opp fil")
    }
  }

  static async deleteFile(url: string) {
    try {
      await del(url)
      return true
    } catch (error) {
      console.error("Blob delete error:", error)
      throw new Error("Kunne ikke slette fil")
    }
  }

  static async listFiles(folder = "projects") {
    try {
      const { blobs } = await list({
        prefix: folder,
      })

      return blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }))
    } catch (error) {
      console.error("Blob list error:", error)
      throw new Error("Kunne ikke liste filer")
    }
  }

  static async uploadProjectImage(projectId: string, file: File) {
    return this.uploadFile(file, `projects/${projectId}/images`)
  }

  static async uploadProjectDocument(projectId: string, file: File) {
    return this.uploadFile(file, `projects/${projectId}/documents`)
  }
}
