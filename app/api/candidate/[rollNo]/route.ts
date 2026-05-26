import { NextRequest, NextResponse } from 'next/server';
import Candidate from '../../../../models/Candidate';
import dbConnect from '../../../../lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ rollNo: string }> }) {
    try {
        const { rollNo } = await params;
        await dbConnect();
        
        // Find the candidate by rollNo
        const candidate = await Candidate.findOne({ rollNo });

        if (!candidate) {
            return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
        }

        return NextResponse.json({ certificatePdfUrl: `/E_Certificate/${rollNo}.pdf` }, { status: 200 });
    } catch (error) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
