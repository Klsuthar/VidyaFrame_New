import { NextRequest, NextResponse } from 'next/server';
import { assets, getAssetBySlug } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const asset = getAssetBySlug(slug);
      if (!asset) {
        return NextResponse.json(
          { success: false, error: 'Asset not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: asset });
    }

    return NextResponse.json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
