import Candidate from '../../../models/Candidate';
import dbConnect from '../../../lib/db';
import QRCode from 'qrcode';
import Link from 'next/link';
import CertificateScaler from '../../../components/CertificateScaler';

async function getCandidate(id: string) {
    try {
        await dbConnect();
        const candidate = await Candidate.findById(id);
        return candidate ? JSON.parse(JSON.stringify(candidate)) : null;
    } catch (e) {
        return null;
    }
}

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const candidate = await getCandidate(id);

    if (!candidate) {
        return <div className="text-center p-10">Certificate not found.</div>;
    }

    const verificationLink = `https://nptel-clone.vercel.app/Ecertificate/${id}`;
    const qrCodeDataURL = await QRCode.toDataURL(verificationLink);

    return (
        <CertificateScaler>
            <div className="bg-white w-[900px] h-[640px] relative text-[#333] font-serif border-[4px] border-[#d4af37] shadow-xl">

                {/* Elite Label - Precise Trapezoid (Inverted: Bigger Side on Top) */}
                {(candidate.finalScore >= 60 && candidate.certificateType?.includes('Elite')) && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30">
                        <div className="bg-[#a52a2a] text-white px-12 py-1.5 font-black text-[22px] tracking-[0.05em] shadow-md"
                            style={{
                                clipPath: 'polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)',
                                fontFamily: 'Arial, sans-serif'
                            }}>
                            {candidate.certificateType.split('+')[0].trim()}
                        </div>
                    </div>
                )}

                {/* Logos Header */}
                <div className="flex justify-between items-center pt-10 px-14 relative">
                    <div className="w-24">
                        <img src="/iit-logo.png" alt="IIT" className="w-[85%] mx-auto" style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.1))' }} />
                    </div>
                    <div className="text-center flex-1 pr-10">
                        <h1 className="text-[2.1rem] font-black text-[#b22222] tracking-tighter mb-0" style={{ fontFamily: 'Georgia, serif', lineHeight: '1.0' }}>
                            NPTEL ONLINE CERTIFICATION
                        </h1>
                        <p className="text-[13px] text-gray-800 font-sans mt-0.5 tracking-tight">(Funded by the MoE, Govt. of India)</p>
                    </div>
                    <div className="w-24 text-right">
                        <img src="/skill-india-logo.png" className="w-[85%] ml-auto" alt="Skill India" />
                    </div>
                </div>

                {/* Content Body */}
                <div className="text-center mt-3 space-y-0.5 px-16 relative z-10">
                    <p className="text-[15px] italic font-serif" style={{ fontFamily: '"Libre Baskerville", Georgia, serif' }}>This certificate is awarded to</p>

                    <h2 className="text-[1.2rem] font-bold text-[#111] uppercase tracking-normal py-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {candidate.name}
                    </h2>

                    <p className="text-[15px] italic font-serif" style={{ fontFamily: '"Libre Baskerville", Georgia, serif' }}>for successfully completing the course</p>

                    <h3 className="text-[1.6rem] font-bold text-[#111] py-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                        {candidate.courseName}
                    </h3>

                    <div className="flex justify-center items-center gap-3 text-lg font-bold mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                        <span className="italic font-normal">with a consolidated score of</span>
                        <span className="text-2xl font-bold font-sans px-1.5">{candidate.finalScore}</span>
                        <span className="text-lg">%</span>
                    </div>

                    <div className="flex justify-center mt-2.5">
                        <table className="border-[2.5px] border-black border-collapse text-center">
                            <tbody>
                                <tr className="text-[15px]">
                                    <td className="px-5 py-2 border-r-[2.5px] border-black font-bold text-[17px]" style={{ fontFamily: 'serif' }}>Online Assignments</td>
                                    <td className="px-5 py-2 border-r-[2.5px] border-black font-bold font-sans text-[1.2rem]">{candidate.assignmentScoreAvg?.toFixed(2)}/25</td>
                                    <td className="px-5 py-2 border-r-[2.5px] border-black font-bold text-[17px]" style={{ fontFamily: 'serif' }}>Proctored Exam</td>
                                    <td className="px-5 py-2 font-bold font-sans text-[1.2rem]">{candidate.examScore}/75</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Regrouped Total Candidates Text with bottom gap */}
                    <div className="pt-2 pb-6">
                        <p className="text-[15px] italic font-serif" style={{ fontFamily: '"Libre Baskerville", Georgia, serif' }}>
                            Total number of candidates certified in this course: <span className="font-bold font-sans not-italic">{candidate.totalCandidates}</span>
                        </p>
                    </div>
                </div>

                {/* Photo (Positioned relative to container) */}
                <div className="absolute top-[145px] right-[40px] border-[1px] border-gray-400 p-[2px] bg-white">
                    <img src={candidate.profileImage || "/placeholder-user.jpg"} className="w-[100px] h-[130px] object-cover" alt="Candidate" />
                </div>

                {/* Signatures Area */}
                <div className="absolute bottom-[130px] w-full px-14 flex justify-between items-end">
                    {/* Left Signature */}
                    <div className="text-center w-[230px] min-h-[95px] flex flex-col justify-end">
                        {candidate.signature1?.image && (
                            <>
                                <div className="h-12 mb-2 flex items-end justify-center">
                                    <img src={candidate.signature1.image} className="max-h-full mix-blend-multiply" alt="Signature" />
                                </div>
                                <p className="font-bold text-[13px] leading-tight text-[#111]">{candidate.signature1?.name}</p>
                                <div className="text-[10px] text-gray-800 leading-tight mt-0.5" dangerouslySetInnerHTML={{ __html: candidate.signature1?.designation || "" }} />
                            </>
                        )}
                    </div>

                    {/* Central Batch Info */}
                    <div className="text-center flex flex-col items-center justify-center flex-1 pb-1">
                        <p className="font-bold text-[17px] text-[#111] mb-0.5 tracking-tight">{candidate.timeline}</p>
                        <p className="text-[13px] font-medium italic text-gray-800">({candidate.courseDuration})</p>
                    </div>

                    {/* Right Signature */}
                    <div className="text-center w-[230px] min-h-[95px] flex flex-col justify-end">
                        {candidate.signature2?.image && (
                            <>
                                <div className="h-12 mb-2 flex items-end justify-center">
                                    <img src={candidate.signature2.image} className="max-h-full mix-blend-multiply" alt="Signature" />
                                </div>
                                <p className="font-bold text-[13px] leading-tight text-[#111]">{candidate.signature2?.name}</p>
                                <div className="text-[10px] text-gray-800 leading-tight mt-0.5" dangerouslySetInnerHTML={{ __html: candidate.signature2?.designation || "" }} />
                            </>
                        )}
                    </div>
                </div>

                {/* Footer Area */}
                <div className="absolute bottom-0 left-0 w-full">
                    {/* Institute Strip (Beige/Tan) */}
                    <div className="bg-[#f3d5b3] h-16 flex items-center justify-between px-10 border-t-[1px] border-[#d4af37]">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <img src="/institutelogo.png" className="h-[58px] w-auto object-contain" alt="Institute Logo" />
                            </div>
                            <span className="font-sans text-[28px] font-medium text-[#111] tracking-tighter" style={{ fontFamily: '"Roboto Condensed", Arial, sans-serif' }}>{candidate.instituteName}</span>
                        </div>
                        <div className="w-[160px]">
                            <img src="/swayam-logo.png" className="w-full" alt="Swayam" />
                        </div>
                    </div>

                    {/* Meta Strip (Red) */}
                    <div className="bg-[#a52a2a] text-white h-[48px] flex items-center justify-between px-10 text-[14px] font-sans">
                        <div className="flex items-center gap-1">
                            <span className="font-medium text-[#eee]">Roll No:</span>
                            <span className="uppercase tracking-widest font-bold text-[15px]">{candidate.rollNo}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-normal text-[13px] text-[#eee]">To verify the certificate</span>
                            <div className="bg-white p-[2px] rounded-[1px]">
                                <img src={qrCodeDataURL} className="w-[38px] h-[38px]" alt="QR Code" />
                            </div>
                        </div>
                        <div className="font-sans text-[13px] text-[#eee]">
                            No. of credits recommended: <span className="font-bold text-white">{candidate.creditsRecommended || "1 or 2"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </CertificateScaler>
    );
}
