import { put, del, list } from '@vercel/blob'

export class BlobService {
  static async uploadFile(file: File, folder: string = 'general'): Promise<string> {
    try {
      const filename = `${folder}/${Date.now()}-${file.name}`
      const blob = await put(filename, file, {
        access: 'public',
      })
      return blob.url
    } catch (error) {
      console.error('Blob upload error:', error)
      throw new Error('Failed to upload file')
    }
  }

  static async deleteFile(url: string): Promise<void> {
    try {
      await del(url)
    } catch (error) {
      console.error('Blob delete error:', error)
      throw new Error('Failed to delete file')
    }
  }

  static async listFiles(folder?: string): Promise<string[]> {
    try {
      const { blobs } = await list({
        prefix: folder,
      })
      return blobs.map(blob => blob.url)
    } catch (error) {
      console.error('Blob list error:', error)
      return []
    }
  }

  static async uploadProjectImage(projectId: string, file: File): Promise<string> {
    return this.uploadFile(file, `projects/${projectId}`)
  }

  static async uploadProjectDocument(projectId: string, file: File): Promise<string> {
    return this.uploadFile(file, `projects/${projectId}/documents`)
  }
}
