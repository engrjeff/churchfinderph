/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface AvatarPickerProps {
  src?: string;
  label: string;
  desc: string;
  onChange: (file: File, src: string) => void;
  onDelete?: () => void;
}

export const AvatarPicker = ({
  src,
  label,
  desc,
  onChange,
  onDelete,
}: AvatarPickerProps) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      multiple: false,
      onDrop(acceptedFiles, fileRejections, event) {
        if (fileRejections.length > 0) {
          console.error('File rejected:', fileRejections);
          return;
        }

        const file = acceptedFiles[0];

        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          // Do whatever you want with the file contents
          const dataUrl = reader.result;
          onChange(file, dataUrl as string);
        };
        reader.readAsDataURL(file);
      },
    });

  React.useEffect(() => {
    if (!src) return;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(src);
  }, [src]);

  return (
    <>
      <div className={cn('flex items-center gap-4')}>
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-lg border-2">
          {src ? (
            <img
              src={src}
              alt={acceptedFiles[0]?.name}
              className="absolute inset-0 size-24 object-cover rounded-lg"
            />
          ) : (
            <ImageIcon className="inset-0 size-8 text-border transition-colors group-hover:text-primary" />
          )}
        </div>

        <div>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{desc}</FormDescription>
          <div className="flex items-center gap-3">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
              >
                {src ? 'Update Photo' : 'Browse Photo'}
              </Button>
            </div>
            {src && onDelete ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="mt-2"
                onClick={() => {
                  onDelete();
                }}
              >
                Delete
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
