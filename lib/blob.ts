import { put, del, list } from '@vercel/blob'

export class BlobService {
  static async uploadFile(file: File, folder: string = 'projects') {
    try {
      const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      
      const blob = await put(filename, file, {
        access: 'public',
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: file.size,
        type: file.type,
        originalName: file.name
      }
    } catch (error) {
      console.error('Blob upload error:', error)
      throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static async uploadBuffer(buffer: Buffer, filename: string, folder: string = 'projects') {
    try {
      const pathname = `${folder}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`

      const blob = await put(pathname, buffer, {
        access: 'public',
      })

      return {
        url: blob.url,
        pathname: blob.pathname,
        size: buffer.length,
      }
    } catch (error) {
      console.error('Blob buffer upload error:', error)
      throw new Error(`Failed to upload buffer: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  static async deleteFile(url: string) {
    try {
      await del(url)
      return true
    } catch (error) {
      console.error('Blob delete error:', error)
      return false
    }
  }

  static async listFiles(folder?: string) {
    try {
      const options = folder ? { prefix: folder } : {}
      const { blobs } = await list(options)

      return blobs.map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }))
    } catch (error) {
      console.error('Blob list error:', error)
      return []
    }
  }

  // Project-specific methods
  static async uploadProjectImage(projectId: string, file: File) {
    return this.uploadFile(file, `projects/${projectId}/images`)
  }

  static async uploadProjectDocument(projectId: string, file: File) {
    return this.uploadFile(file, `projects/${projectId}/documents`)
  }

  static async getProjectFiles(projectId: string) {
    try {
      const [images, documents] = await Promise.all([
        this.listFiles(`projects/${projectId}/images`),
        this.listFiles(`projects/${projectId}/documents`),
      ])

      return { images, documents }
    } catch (error) {
      console.error('Get project files error:', error)
      return { images: [], documents: [] }
    }
  }

  static async deleteProjectFile(projectId: string, pathname: string) {
    // Security check: ensure the file belongs to the project
    if (!pathname.startsWith(`projects/${projectId}/`)) {
      throw new Error('Unauthorized file access')
    }

    return this.deleteFile(pathname)
  }

  // Utility methods
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || ''
  }

  static isImageFile(filename: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
    return imageExtensions.includes(this.getFileExtension(filename))
  }

  static isDocumentFile(filename: string): boolean {
    const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
    return docExtensions.includes(this.getFileExtension(filename))
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
}
