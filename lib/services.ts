import { toast } from 'sonner';

export async function uploadImage(
  fileUrl: string,
  folderSubPath: string,
  type: 'logo' | 'pastor' | `gallery-${number}`
) {
  if (!fileUrl || !folderSubPath) {
    toast.error('Please upload a file and enter a church name');
    return { error: true, url: null };
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: fileUrl, churchName: folderSubPath, type }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Upload failed:', error);
    toast.error('Failed to upload logo');
    return { error: true, url: null };
  }

  const result = await response.json();

  if (!result.url) {
    return { error: false, url: null };
  }

  return { error: false, url: result.url as string };
}

/**
 *
 * @param fileData array of data URLs
 * @returns the image URLs
 */
export async function uploadGalleryImages(
  fileData: string[],
  churchName: string
) {
  const result = await Promise.all(
    fileData.map(async (fileUri, index) => {
      const uploadResult = await uploadImage(
        fileUri,
        churchName,
        `gallery-${index + 1}`
      );
      return { url: uploadResult.url as string };
    })
  ).then((values) => values.filter((i) => Boolean(i.url)));

  return result;
}
