export default function MainContent() {
    return (
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 text-[13px] leading-relaxed text-gray-800 font-sans px-4 md:px-0">
            {/* Left Column: Text Content */}
            <div className="space-y-4 text-justify">
                <p>
                    NPTEL web and video courses across 23 disciplines are available on our portal
                    archive.nptel.ac.in. In 2014 process of getting certified from NPTEL courses was initiated, so
                    that learners get a tangible end result in the form of a certificate from the IITs/IISc for their
                    effort.
                </p>

                <p>
                    Certification courses are offered twice a year (Jan-Jun, Jul-Dec). Joining a course is free.
                    Anyone can learn from these courses anywhere anytime. No pre-requisites, no age limit, no
                    entrance criteria to enroll.
                </p>

                <p>
                    Learning can be done by watching videos and this is tested by the weekly assignments, that
                    are to be submitted online within the prescribed deadline. Any queries/doubts you may have,
                    you can post in the respective discussion forum, which will be answered by the faculty and
                    his/her team.
                </p>

                <p>
                    There is an optional proctored certification exam that the learner can take for a nominal fee
                    at the end of the course to earn certificates from the IITs. The learner has to be present in
                    person for the exam and currently exams are conducted only in India in about 130+ cities in
                    two shifts. Learner has to appear at the designated exam centre to participate in the exam,
                    where his/her id is verified. 25% of the final marks comes from the Assignments and 75% from
                    the final exam.
                </p>

                <div className="space-y-1">
                    <p>The main benefits of participating in an online course under NPTEL are:</p>
                    <ol className="list-decimal list-inside pl-1 space-y-1">
                        <li>Students: credit transfer and better resume</li>
                        <li>Faculty: Refresher courses, AICTE recognized FDP courses</li>
                        <li>Working professionals: For upskilling and reskilling</li>
                    </ol>
                </div>

                <p>
                    For any more clarification / queries, please <a href="#" className="text-blue-600 hover:underline">click here</a>.
                </p>
            </div>

            {/* Right Column: Promotional Box */}
            <div>
                <div className="bg-[#4a154b] text-white p-6 relative overflow-hidden h-full flex flex-col justify-center">
                    <h2 className="text-center text-xl font-bold mb-8 uppercase tracking-wide">
                        NPTEL Online Certification Courses
                    </h2>

                    <div className="flex relative">
                        {/* Diagonal Divider */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white transform -skew-x-[20deg] origin-center -translate-x-1/2 hidden md:block"></div>

                        {/* Left Side of Box */}
                        <div className="w-1/2 pr-4 text-center flex flex-col items-center justify-center z-10">
                            <p className="text-lg mb-4 font-semibold">
                                To access courses<br />offered before May<br />2019, go to
                            </p>
                            <a href="https://onlinecourses-archive.nptel.ac.in/" className="text-[#3498db] text-lg hover:underline break-all">
                                https://onlinecourses-<br />archive.nptel.ac.in/
                            </a>
                        </div>

                        {/* Right Side of Box */}
                        <div className="w-1/2 pl-4 text-center flex flex-col items-center justify-center z-10">
                            <p className="text-lg mb-4 font-semibold">
                                To access new courses<br />offered from Jan 2020<br />semester, go to
                            </p>
                            <a href="https://swayam.gov.in/" className="text-[#3498db] text-lg hover:underline">
                                https://swayam.gov.in/
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
