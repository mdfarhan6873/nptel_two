'use client';

import { useEffect, useState } from 'react';

export default function VerificationPage() {
    const [rollNo, setRollNo] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const rNo = hash.substring(1); // Remove the '#' character
            setRollNo(rNo);
            
            // Fetch candidate info to get the PDF URL
            fetch(`/api/candidate/${rNo}`)
                .then(res => res.json())
                .then(data => {
                    if (data.certificatePdfUrl) {
                        setPdfUrl(data.certificatePdfUrl);
                    }
                })
                .catch(err => console.error('Error fetching certificate:', err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#525659] flex items-center justify-center m-0 p-0" style={{ backgroundColor: '#525659' }}>
                <p className="text-white text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#525659] flex flex-col items-center justify-center m-0 p-0" style={{ backgroundColor: '#525659' }}>
            {pdfUrl ? (
                <a 
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#337ab7] hover:bg-[#286090] text-white px-6 py-3 rounded-[3px] text-lg font-sans border border-[#2e6da4] inline-block shadow-sm"
                    style={{ textDecoration: 'none' }}
                >
                    Course Certificate
                </a>
            ) : rollNo ? (
                <p className="text-white text-lg">Certificate not found for roll number: {rollNo}</p>
            ) : (
                <p className="text-white text-lg">Invalid certificate link.</p>
            )}
        </div>
    );
}
