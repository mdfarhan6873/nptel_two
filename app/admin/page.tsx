"use client";

import { useActionState, useState } from 'react';
import { createCandidate } from './actions';

const initialState = {
    success: false,
    message: '',
    candidateId: '',
    rollNo: '',
};

export default function AdminPage() {
    const [state, formAction] = useActionState(createCandidate as any, initialState);
    const [rollNo, setRollNo] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name) {
            const filename = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
            if (filename && !filename.includes(' ')) {
                setRollNo(filename);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center text-[#2a6db1]">Admin Panel - Add Candidate</h1>

                {state?.message && (
                    <div className={`p-4 mb-4 rounded ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {state.message}
                        
                        {state.success && state.candidateId && (
                            <div className="mt-4 flex flex-col items-center justify-center p-4 bg-white border rounded text-black">
                                <p className="font-bold mb-2">QR Code for {state.rollNo}</p>
                                <img src={`/api/qr/${state.candidateId}`} alt="QR Code" className="w-48 h-48 border" />
                                <a 
                                    href={`/api/qr/${state.candidateId}?download=true`} 
                                    download={`qr-${state.rollNo}.png`}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block text-center"
                                >
                                    Download QR Code
                                </a>
                                <p className="text-sm mt-2 text-gray-600 text-center">
                                    Download this QR code and add it to the user's certificate before printing.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <form action={formAction} className="space-y-6">
                    {/* Personal Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" name="name" required className="w-full border p-2 rounded" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" required className="w-full border p-2 rounded" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name="password" required className="w-full border p-2 rounded" placeholder="******" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input type="date" name="dob" className="w-full border p-2 rounded" />
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-green-50 p-4 border border-green-200 rounded">
                            <label className="block text-sm font-bold text-green-800 mb-1">Final Certificate PDF</label>
                            <input type="file" name="certificatePdf" accept="application/pdf" required className="w-full border p-2 rounded bg-white" onChange={handleFileChange} />
                            <p className="text-xs text-green-700 mt-1">Upload the finalized PDF document here. This is the exact file the user will see when they click "Course Certificate".</p>
                        </div>
                    </div>

                    {/* Course Details */}
                    <div className="bg-blue-50 p-4 rounded border border-blue-100">
                        <h3 className="text-lg font-semibold mb-4 text-[#2a6db1]">Course Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                                <input type="text" name="courseName" required className="w-full border p-2 rounded" placeholder="Soft Skills" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number (Leave empty to auto-generate)</label>
                                <input type="text" name="rollNo" className="w-full border p-2 rounded" placeholder="NPTEL26HS... (Optional)" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                                <input type="text" name="timeline" required className="w-full border p-2 rounded" placeholder="Jul-Oct 2025" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                <select name="courseDuration" className="w-full border p-2 rounded">
                                    <option value="4 week course">4 week course</option>
                                    <option value="8 week course">8 week course</option>
                                    <option value="12 week course">12 week course</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                                <input type="text" name="instituteName" className="w-full border p-2 rounded" placeholder="Indian Institute of Technology Roorkee" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Credits Recommended</label>
                                <input type="text" name="creditsRecommended" className="w-full border p-2 rounded" placeholder="3 or 4" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Candidates Certified</label>
                                <input type="number" name="totalCandidates" className="w-full border p-2 rounded" placeholder="12417" />
                            </div>
                        </div>
                    </div>

                    {/* Marks */}
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 text-[#2a6db1]">Marks</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Scores (Comma separated, out of 100)</label>
                                <input type="text" name="assignmentScores" required className="w-full border p-2 rounded" placeholder="90, 80, 85, 100, 75, 80, 90, 95" />
                                <p className="text-xs text-gray-500 mt-1">Enter raw scores out of 100. System will take best 8/12.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Proctored Exam Score (Out of 75)</label>
                                <input type="number" name="examScore" required className="w-full border p-2 rounded" placeholder="48" />
                            </div>
                        </div>
                    </div>

                    {/* Signatures removed for manual PDF upload mode */}

                    <div className="flex justify-end">
                        <button type="submit" className="bg-[#2a6db1] text-white px-8 py-3 rounded hover:bg-[#1e5c99] font-bold">
                            Add Candidate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
