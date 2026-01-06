import Link from 'next/link';

export default function ActionButtons() {

    return (
        <div className="container mx-auto mt-8 mb-6 px-4 md:px-0">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left Group */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mr-auto w-full md:w-auto">
                    <Link
                        href="/swayamopenid"
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 md:px-5 md:py-3 text-base md:text-lg font-normal transition-colors text-center flex-grow md:flex-grow-0"
                    >
                        Candidate Login
                    </Link>
                    <a
                        href="https://swayamopenid.b2clogin.com/swayamopenid.onmicrosoft.com/B2C_1_ExamPolicy/oauth2/v2.0/authorize?scope=https%3A%2F%2Fswayamopenid.onmicrosoft.com%2Fapi%2Fuser_impersonation%20offline_access%20openid&state=f74c0dafb65cd0dd49f40360110e74f1&response_type=code&approval_prompt=auto&redirect_uri=https%3A%2F%2Farchive.nptel.ac.in%2Fnoc%2FB2C%2Findex.php%2F&client_id=a07ebc01-4cc4-46dc-8e8f-ecc87f5956b1"
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 md:px-5 md:py-3 text-base md:text-lg font-normal transition-colors text-center flex-grow md:flex-grow-0"
                    >
                        Course instructor login
                    </a>
                    <a
                        href="https://archive.nptel.ac.in/noc/noc_course.html"
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 md:px-5 md:py-3 text-base md:text-lg font-normal transition-colors text-center flex-grow md:flex-grow-0"
                    >
                        Courses
                    </a>
                    <a
                        href="https://archive.nptel.ac.in/noc/Domain/"
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 md:px-5 md:py-3 text-base md:text-lg font-normal transition-colors text-center flex-grow md:flex-grow-0"
                    >
                        Domain
                    </a>
                </div>

                {/* Right Group */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
                    <a
                        href="https://archive.nptel.ac.in/noc/NPTELSemester.html"
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 md:px-5 md:py-3 text-base md:text-lg font-normal transition-colors text-center flex-grow md:flex-grow-0"
                    >
                        Information on NPTEL semesters
                    </a>
                    <a
                        href="https://archive.nptel.ac.in/noc/livesession.html"
                        className="bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 md:px-5 md:py-3 text-base md:text-lg font-normal transition-colors text-center flex-grow md:flex-grow-0"
                    >
                        Live Sessions
                    </a>
                </div>
            </div>
        </div>
    );
}
