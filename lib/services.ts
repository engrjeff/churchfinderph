import { toast } from 'sonner';

export async function uploadLogo(logo: string, folderSubPath: string) {
  if (!logo || !folderSubPath) {
    toast.error('Please upload a logo and enter a church name');
    return;
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: logo, churchName: folderSubPath }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Upload failed:', error);
    toast.error('Failed to upload logo');
    return;
  }

  const result = await response.json();

  return result.url as string;
}
