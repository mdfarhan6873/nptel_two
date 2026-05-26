import { NextRequest, NextResponse } from 'next/server';
import Candidate from '../../../models/Candidate';
import dbConnect from '../../../lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;
    
    // Extract rollNo from filename (e.g. NPTEL26HS54S552400444.pdf)
    const rollNo = filename.replace(/\.pdf$/, '');
    
    try {
        await dbConnect();
        const candidate = await Candidate.findOne({ rollNo });

        if (!candidate || (!candidate.certificatePdfUrl && !candidate.certificatePdfBase64)) {
            return new NextResponse('Certificate not found.', { status: 404 });
        }

        let pdfBuffer: Buffer;

        if (candidate.certificatePdfBase64) {
            // New method: Serve directly from MongoDB Base64 string
            pdfBuffer = Buffer.from(candidate.certificatePdfBase64, 'base64');
        } else {
            // Legacy method for older candidates: Fetch from Cloudinary
            const pdfResponse = await fetch(candidate.certificatePdfUrl);
            if (!pdfResponse.ok) {
                return new NextResponse('Failed to fetch certificate from storage.', { status: 502 });
            }
            pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer());
        }

        // Convert Node Buffer to standard Web API Uint8Array to satisfy TypeScript BodyInit types
        const body = new Uint8Array(pdfBuffer);

        return new NextResponse(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="${filename}"`,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
