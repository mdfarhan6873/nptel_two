import Link from "next/link";

export default function NptelStars() {
    return (
        <div className="min-h-screen flex items-start justify-center pt-32 bg-white px-4 font-sans">
            <h1 className="text-xl md:text-2xl font-bold text-[#ff0000] text-center leading-relaxed">
                We have changed our links. Please go to <a href="https://archive.nptel.ac.in/course.html" className="text-[#0099cc] hover:underline">https://archive.nptel.ac.in/course.html</a> and <br className="hidden md:block" /> update your bookmarks.
            </h1>
        </div>
    );
}
