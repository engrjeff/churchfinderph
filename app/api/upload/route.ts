import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const file = body.file;
    const churchName = body.churchName;

    const folder = `churchfinderphdev/churches/${churchName}/media`;

    const paramsToSign = {
      folder,
      timestamp: Math.floor(Date.now() / 1000),
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    };

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    const result = await cloudinary.uploader.upload(file, {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
      signature,
      folder,
      timestamp: paramsToSign.timestamp,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });

    const url = result.url;

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to upload image',
      },
      { status: 500 }
    );
  }
}
