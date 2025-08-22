import { toast } from 'sonner';

export async function uploadImage(
  logo: string,
  folderSubPath: string,
  type: 'logo' | 'pastor'
) {
  if (!logo || !folderSubPath) {
    toast.error('Please upload a logo and enter a church name');
    return { error: true, url: null };
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: logo, churchName: folderSubPath, type }),
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
