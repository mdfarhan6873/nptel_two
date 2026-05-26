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

        if (!candidate || !candidate.certificatePdfUrl) {
            return new NextResponse('Certificate not found.', { status: 404 });
        }

        // Redirect directly to the Cloudinary PDF URL
        return NextResponse.redirect(candidate.certificatePdfUrl);
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
