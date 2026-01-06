import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-[#2a6db1] text-white p-2">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo and Title Section */}
                <div className="flex items-center space-x-3 w-full md:w-auto justify-center md:justify-start">
                    <div className="relative h-12 w-36 md:h-16 md:w-46">
                        <Image
                            src="/nptel-logo.png"
                            alt="NPTEL Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:text-[15px] font-medium w-full md:w-auto">
                    <Link href="/" className="hover:text-gray-200">Home</Link>
                    <Link href="/nptelstars" className="hover:text-gray-200">NPTEL Stars</Link>
                    <a href="https://archive.nptel.ac.in/noc/NPTELSemester.html" className="hover:text-gray-200">Semester Information</a>
                    <a href="https://archive.nptel.ac.in/noc/noc_faq.html" className="hover:text-gray-200">FAQ</a>
                    <a href="https://archive.nptel.ac.in/noc/contact.html" className="hover:text-gray-200">Contact</a>
                </nav>
            </div>
        </header>
    );
}
