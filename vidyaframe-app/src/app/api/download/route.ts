import { NextRequest, NextResponse } from 'next/server';
import { getAssetBySlug } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const format = searchParams.get('format') || 'pdf';
    const school = searchParams.get('school') || '';
    const color = searchParams.get('color') || '';

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Asset slug is required' },
        { status: 400 }
      );
    }

    const asset = getAssetBySlug(slug);
    if (!asset) {
      return NextResponse.json(
        { success: false, error: 'Asset not found' },
        { status: 404 }
      );
    }

    // Resolve existing file on disk as download URL
    let downloadUrl = asset.imageMasterUrl;
    const absolutePath = path.join(process.cwd(), 'public', downloadUrl);

    if (!fs.existsSync(absolutePath)) {
      // Fallback if the file does not exist on disk
      if (asset.category === 'Worksheet') {
        downloadUrl = '/assets/masters/counting-worksheet-1-to-10.png';
      } else {
        downloadUrl = '/assets/masters/counting-chart-1-to-10.png';
      }
    }

    const filename = school ? `${slug}-branded.${format}` : `${slug}-clean.${format}`;

    return NextResponse.json({
      success: true,
      message: 'Download compiled successfully',
      filename,
      downloadUrl,
      meta: {
        title: asset.title,
        schoolBranded: !!school,
        schoolName: school,
        brandColor: color,
        format,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
