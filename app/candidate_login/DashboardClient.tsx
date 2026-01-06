"use client";
// Force refresh

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardClient({ candidate }: { candidate: any }) {
    const [view, setView] = useState<'initial' | 'profile'>('initial');
    const [showResults, setShowResults] = useState(false);
    const router = useRouter();

    if (!candidate) {
        return (
            <div className="flex flex-col items-center justify-center pt-20">
                <div className="bg-white shadow-md rounded border border-gray-300 w-full max-w-4xl p-0">
                    <div className="bg-[#337ab7] text-white p-2 text-center font-bold">
                        Click here to view your login
                    </div>
                    <div className="p-8 text-center text-red-500">
                        No session found. Please login again.
                        <div className="mt-4">
                            <Link href="/swayamopenid" className="text-blue-500 underline">Go to Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (view === 'initial') {
        return (
            <div className="flex flex-col items-center justify-center pt-20 font-sans">
                <div className="bg-white shadow-lg rounded-sm border border-gray-300 w-full max-w-4xl p-0">
                    <div className="bg-[#337ab7] text-white p-2 text-center font-bold text-sm">
                        Click here to view your login
                    </div>
                    <div className="p-8 flex justify-center">
                        <button
                            onClick={() => setView('profile')}
                            className="bg-[#5cb85c] hover:bg-[#449d44] text-white py-1 px-4 rounded text-sm font-normal"
                        >
                            candidate
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start pt-8 font-sans space-y-4">
            {/* Candidate Profile Card */}
            <div className="bg-white shadow-lg rounded-sm border border-gray-300 w-full max-w-5xl p-0">
                <div className="bg-[#337ab7] text-white p-2 text-center font-bold text-sm">
                    NOC candidate profile
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Photo */}
                        <div className="border p-1 bg-white shadow-sm inline-block">
                            {candidate.profileImage ? (
                                <img src={candidate.profileImage} alt="Profile" className="w-[120px] h-[150px] object-cover" />
                            ) : (
                                <div className="w-[120px] h-[150px] bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Photo</div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 space-y-2">
                            <h2 className="text-xl text-[#333] mb-4">{candidate.name}</h2>

                            <div className="text-sm text-[#333] flex items-center">
                                <span className="mr-2">✉</span> {candidate.email}
                            </div>
                            <div className="text-sm text-[#333] flex items-center">
                                <span className="mr-2">📅</span> {candidate.timeline || "Jul 01 2005"}
                            </div>
                            {candidate.dob && (
                                <div className="text-sm text-[#333] flex items-center">
                                    <span className="mr-2">🎂</span> {new Date(candidate.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                            )}

                            <div className="mt-4">
                                <button className="bg-[#337ab7] text-white text-xs px-3 py-1 mr-2 rounded-sm flex items-center gap-1">
                                    <span>🖨</span> Payment receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Results Header */}
            <div className="bg-white shadow-lg rounded-sm border border-gray-300 w-full max-w-5xl p-0">
                <div className="bg-[#337ab7] text-white p-2 text-center font-bold text-sm">
                    NOC Exam results
                </div>

                {/* Table */}
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse border border-gray-200">
                        <thead className="bg-[#f9f9f9] text-[#333] font-bold">
                            <tr>
                                <th className="border p-2">Timeline</th>
                                <th className="border p-2">Roll No</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Course Name</th>
                                <th className="border p-2">Assignment score (25)</th>
                                <th className="border p-2">Exam score (75)</th>
                                <th className="border p-2">Final Score (100)</th>
                                <th className="border p-2">Certificate Rating</th>
                                <th className="border p-2">Download E-Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">{candidate.timeline}</td>
                                <td className="border p-2">{candidate.rollNo}</td>
                                <td className="border p-2">{candidate.name}</td>
                                <td className="border p-2">{candidate.courseName}</td>
                                <td className="border p-2">{candidate.assignmentScoreAvg}</td>
                                <td className="border p-2">{candidate.examScore}</td>
                                <td className="border p-2">{candidate.finalScore}</td>
                                <td className="border p-2 font-bold text-[#b22222]">{candidate.certificateType}</td>
                                <td className="border p-2">
                                    {showResults ? (
                                        <span className="flex gap-2">
                                            <span className="text-blue-600 underline cursor-pointer">Linked In</span>
                                            <span className="text-blue-600 underline cursor-pointer">Facebook</span>
                                            <Link href={`/Ecertificate/${candidate._id}`} className="text-blue-600 underline cursor-pointer">Download E-Certificate</Link>
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => setShowResults(true)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Click here
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Detailed Assignment View */}
                    {showResults && (
                        <div className="mt-6 border-t pt-4">
                            <h4 className="font-bold text-sm mb-2 text-[#333]">Assignment Scores:</h4>
                            <table className="w-full text-sm text-center border-collapse border border-gray-200 mb-4">
                                <thead className="bg-[#f9f9f9]">
                                    <tr>
                                        {[...Array(12)].map((_, i) => (
                                            <th key={i} className="border p-1 text-xs">A{i + 1}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {[...Array(12)].map((_, i) => {
                                            const score = candidate.assignmentScores && candidate.assignmentScores[i] !== undefined ? candidate.assignmentScores[i] : "";
                                            return <td key={i} className="border p-1">{score}</td>
                                        })}
                                    </tr>
                                </tbody>
                            </table>

                            <div className="text-xs text-[#333] space-y-1">
                                <p className="font-bold">Calculation Logic:</p>
                                <ul className="list-disc pl-5">
                                    <li>Assignment Score = Average of best 8 out of 12 assignments.</li>
                                    <li>Final Score(Score on Certificate)= 75% of Exam Score + 25% of Assignment Score.</li>
                                    <li className="italic text-gray-500">Note: We have taken best assignment score from July 2024 course</li>
                                </ul>
                            </div>

                            <div className="text-xs text-[#333] space-y-1 mt-4">
                                <p className="font-bold text-blue-600">ELIGIBILITY CRITERIA TO GET A CERTIFICATE:</p>
                                <p>AVERAGE ASSIGNMENT SCORE &ge;10/25 AND EXAM SCORE &ge; 30/75 AND FINAL SCORE &ge;40</p>
                                <p>BASED ON THE FINAL SCORE, Certificate criteria will be as below:</p>
                                <p>&ge;90 - Elite + Gold</p>
                                <p>75-89 - Elite + Silver</p>
                                <p>&ge;60 - Elite</p>
                                <p>40-59 - Successfully Completed</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
