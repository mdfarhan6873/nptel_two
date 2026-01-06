import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2a6db1] text-white py-4 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">

                {/* Left Section */}
                <div className="text-sm">
                    <div className="font-bold flex items-center gap-1">
                        <span className="text-lg">©</span> NPTEL
                    </div>
                    <div className="text-xs text-gray-200">
                        Copyright© 2019. All Rights Reserved.
                    </div>
                </div>

                {/* Center Section */}
                <div className="my-2 md:my-0">
                    <Link href="#" className="flex items-center gap-2 hover:underline">
                        <span>📄</span> Code of Conduct
                    </Link>
                </div>

                {/* Right Section - Social Icons */}
                <div className="flex space-x-1">
                    <SocialIcon letter="f" />
                    <SocialIcon letter="t" />
                    <SocialIcon letter="in" />
                    <SocialIcon letter="g+" />
                    <SocialIcon letter="You Tube" wide />
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ letter, wide = false }: { letter: string; wide?: boolean }) {
    return (
        <a
            href="#"
            className={`${wide ? 'w-10' : 'w-8'
                } h-8 bg-[#333] flex items-center justify-center hover:bg-black transition-colors text-white text-sm font-bold`}
        >
            {logoMap(letter)}
        </a>
    );
}

function logoMap(letter: string) {
    // Simple text fallback for icons basically
    if (letter === 'f') return 'f';
    if (letter === 't') return '🐦'; // using emoji or simple chars
    if (letter === 'in') return 'in';
    if (letter === 'g+') return 'g+';
    if (letter === 'You Tube') return 'Tube';
    return letter;
}
