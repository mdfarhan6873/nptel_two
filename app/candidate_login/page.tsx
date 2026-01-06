"use server";

import Candidate from '../../models/Candidate';
import dbConnect from '../../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import Link from 'next/link';

async function getCandidate() {
    const cookieStore = await cookies();
    const candidateId = cookieStore.get('candidateId')?.value;

    if (!candidateId) return null;

    await dbConnect();
    try {
        const candidate = await Candidate.findById(candidateId);
        return candidate ? JSON.parse(JSON.stringify(candidate)) : null; // Parsing to remove Mongoose specific types for Client Component
    } catch (e) {
        return null;
    }
}

export default async function CandidateLogin() {
    const candidate = await getCandidate();

    //   if (!candidate) {
    //     redirect('/swayamopenid');
    //   }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[#2a6db1] text-white py-2 px-6 shadow-md relative">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-4 mb-2 md:mb-0 text-center">
                        <img src="/nptel-logo.png" alt="NPTEL Logo" className="h-14 w-auto drop-shadow-sm rounded-full bg-transparent" />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-wide">NPTEL</h1>
                            <p className="text-xs md:text-xs font-semibold tracking-wider">ONLINE CERTIFICATION</p>
                        </div>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-6 text-sm font-medium">
                        <Link href="/" className="hover:text-gray-200">Home</Link>
                        <Link href="/nptelstars" className="hover:text-gray-200">NPTEL Stars</Link>
                        <a href="https://archive.nptel.ac.in/noc/NPTELSemester.html" className="hover:text-gray-200">Semester Information</a>
                        <a href="https://archive.nptel.ac.in/noc/noc_faq.html" className="hover:text-gray-200">FAQ</a>
                        <a href="https://archive.nptel.ac.in/noc/contact.html" className="hover:text-gray-200">Contact</a>
                    </nav>
                </div>
            </header>

            <div className="container mx-auto p-4 relative">
                <div className="absolute right-4 top-4">
                    <Link href="/swayamopenid" onClick={async () => {
                        "use server";
                        const c = await cookies();
                        c.delete('candidateId');
                    }} className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white px-4 py-2 rounded text-sm font-medium transition">
                        Logout
                    </Link>
                </div>

                <DashboardClient candidate={candidate} />
            </div>

        </div>
    );
}