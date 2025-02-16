export const getGoogleDriveImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined
  const fileId = url.match(/d\/([a-zA-Z0-9_-]+)\//)?.[1]
  return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url
}