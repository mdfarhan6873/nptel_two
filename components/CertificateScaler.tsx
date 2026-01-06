"use client";

import { useEffect, useState, useRef } from "react";

export default function CertificateScaler({ children }: { children: React.ReactNode }) {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const parentWidth = window.innerWidth;
                const certificateWidth = 900; // Original width
                const padding = 32; // Standard padding (p-4 = 16px each side)

                if (parentWidth < certificateWidth + padding) {
                    const newScale = (parentWidth - padding) / certificateWidth;
                    setScale(newScale);
                } else {
                    setScale(1);
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center min-h-screen py-10 w-full overflow-x-hidden bg-gray-100"
        >
            <div
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "center top",
                    width: "900px",
                    height: `${640 * scale}px`, // Adjust height of parent to avoid empty space
                    transition: "transform 0.1s ease-out"
                }}
                className="relative flex-shrink-0"
            >
                {children}
            </div>
        </div>
    );
}
