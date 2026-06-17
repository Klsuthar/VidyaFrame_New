import { NextRequest, NextResponse } from 'next/server';
import { getAssetBySlug } from '@/lib/data';

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

    // In a real production setup, we would generate a PDF or image buffer using
    // a PDF generator (e.g. pdf-lib) overlaying the school name, logo, and brand color.
    // For this prototype, we return metadata and the link to the high-res master image.
    
    return NextResponse.json({
      success: true,
      message: 'Download compiled successfully',
      filename: `${slug}-branded.${format}`,
      downloadUrl: asset.imageMasterUrl,
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
