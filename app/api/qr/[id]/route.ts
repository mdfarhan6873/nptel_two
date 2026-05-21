import QRCode from 'qrcode';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        
        // Get the host from request to make the URL dynamic
        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const domain = `${protocol}://${host}`;
        
        const verificationLink = `${domain}/Ecertificate/${id}`;
        
        // Generate QR Code as a buffer
        const qrBuffer = await QRCode.toBuffer(verificationLink, {
            type: 'png',
            margin: 1,
            width: 300,
        });

        // Check if it's a download request
        const { searchParams } = new URL(request.url);
        const isDownload = searchParams.get('download') === 'true';

        const headers: HeadersInit = {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        };

        if (isDownload) {
            headers['Content-Disposition'] = `attachment; filename="qr-${id}.png"`;
        } else {
            headers['Content-Disposition'] = `inline; filename="qr-${id}.png"`;
        }

        return new NextResponse(qrBuffer as unknown as BodyInit, {
            status: 200,
            headers: headers
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
    }
}
