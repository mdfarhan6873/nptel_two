"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginCandidate } from './actions';

export default function SwayamOpenId() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4 font-sans text-[#333]">
            {/* Header Section */}
            <div className="text-center mb-8">
                <div className="flex justify-center mb-2">
                    <img
                        src="/nptel-full-logo.png"
                        alt="NPTEL Online Course Certification Exams"
                        className="h-auto max-h-36 max-w-full object-contain"
                    />
                </div>
            </div>

            {/* Note Section */}
            <div className="w-full max-w-4xl bg-[#e6e6e6] p-4 text-sm text-[#666] mb-12 border border-[#d6d6d6] rounded-sm">
                <span className="font-bold text-[#333]">Note:</span>
                <div className="mt-1">
                    Please make sure that you login using the same email id you had used while enrolling (joining) to the course.
                </div>
            </div>

            {/* Main Login Area - Split Layout */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row relative">
                {/* Left Side: Social Login */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 md:pr-12 md:border-r border-gray-300">
                    <a
                        href="https://login.live.com/oauth20_authorize.srf?client_id=3fdf18f7-c69d-4c7e-9780-20cdf613ae82&redirect_uri=https%3a%2f%2fswayamopenid.b2clogin.com%2fswayamopenid.onmicrosoft.com%2foauth2%2fauthresp&response_type=code&scope=openid+profile+email&response_mode=form_post&nonce=CXy%2f9AMIBK2ZQYURNwpGIw%3d%3d&state=StateProperties%3deyJTSUQiOiJ4LW1zLWNwaW0tcmM6MWFiY2Q1YzUtNDA1Zi00ZDI0LWFmNDUtZDE0MmM4YTQyYzViIiwiVElEIjoiMDQ4MDY0ZjUtYWQwNS00MjMxLWE0ZDctNTE2ZGNlOGE0NGVjIiwiVE9JRCI6IjAyNDc4NDcwLTgzZDEtNGY3NC1iY2MwLTQyYzM3MzRhZDE3MCJ9"
                        className="flex items-center w-full max-w-[300px] h-12 border border-gray-400 rounded-full px-4 hover:bg-gray-50 transition-colors bg-white no-underline"
                    >
                        <div className="w-6 h-6 relative mr-3">
                            {/* Microsoft Logo Placeholder - 4 squares */}
                            <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                                <div className="bg-[#f25022]"></div>
                                <div className="bg-[#7fba00]"></div>
                                <div className="bg-[#00a4ef]"></div>
                                <div className="bg-[#ffb900]"></div>
                            </div>
                        </div>
                        <span className="text-gray-600 font-medium">Microsoft</span>
                    </a>

                    <a
                        href="https://accounts.google.com/v3/signin/identifier?opparams=%253F&dsh=S1829807551%3A1767699605238612&client_id=879757834676-rhljti4m1iaaa8fmqcqq4ebaniend8oe.apps.googleusercontent.com&o2v=1&redirect_uri=https%3A%2F%2Fswayamopenid.b2clogin.com%2Fswayamopenid.onmicrosoft.com%2Foauth2%2Fauthresp&response_type=code&scope=email+profile&service=lso&state=StateProperties%3DeyJTSUQiOiJ4LW1zLWNwaW0tcmM6NTM0NTY4NDYtZjUzZC00ZDU3LWFhNjUtZTg1OTI5ODAxODY3IiwiVElEIjoiMDQ4MDY0ZjUtYWQwNS00MjMxLWE0ZDctNTE2ZGNlOGE0NGVjIiwiVE9JRCI6IjAyNDc4NDcwLTgzZDEtNGY3NC1iY2MwLTQyYzM3MzRhZDE3MCJ9&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hAOLCkj_QajYXccg-h4OgySXj696VXHEqmAPSb1FyY4SfRdEkXNlBvxMbCudN6BnQTOYI7mkuGlpuwcnh995qn4XKeSGyGh4DFHCE19tD51bW_G1ygTsxkEn7KwZf3rqAsYV2Q1pEbf8z7dI23OURqfYxYXUrjnsctNbhPRgzFH1IQQPX0gaq2NhwjNVPjFVVcVhOkMhEOydSUTcSXpGyn_oUj8QA_DXzUow-AnQ4EW0sduEiJMZHjCmCuz38LqDEIrqt-wueC0B7xgh2HLM8kAVYGI05Phu0mqvKI4O82fllZUrRahmAxslL3IiBb6ZoRMKSas0scpqPaH1oqTb86zLQMk30wYVGi7LJIV5PBN-43-xfOT2zvvc1eodlkjzpey1Ln9P5zw3-rxsLJPMVd4x4ez83ArOKBjx7fV3KCa32VZ_b2YaH849eREfhldmOAcz_eGOP4n-X2SjMYBTrnzvRVSTJJCYB3mudFeB9G7aKrmn6ZA%26flowName%3DGeneralOAuthFlow%26as%3DS1829807551%253A1767699605238612%26client_id%3D879757834676-rhljti4m1iaaa8fmqcqq4ebaniend8oe.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=https%3A%2F%2Fswayamopenid.b2clogin.com&rart=ANgoxceq96MLAfE8N3GZMM9s6YRmMZ3ed50xfraXYbRLkf6CwPSvPxCneL3cekIB95-JUQl-wYaWcYsrcNSwPayKre8ciqcsS--e-YSGlkbg4cy_ZwRvSVE"
                        className="flex items-center w-full max-w-[300px] h-12 border border-gray-400 rounded-full px-4 hover:bg-gray-50 transition-colors bg-white no-underline"
                    >
                        <div className="w-6 h-6 relative mr-3">
                            {/* Google Logo Placeholder - 'G' mimic or colored circle */}
                            <svg viewBox="0 0 24 24" className="w-6 h-6">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 4.62c1.61 0 3.06.56 4.21 1.64l3.16-3.16C17.45 1.18 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>
                        <span className="text-gray-600 font-medium">Google</span>
                    </a>
                </div>

                {/* OR Divider Label (Absolute positioned nicely between or just managed with flex basics) */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 text-gray-400 text-lg hidden md:block">
                    OR
                </div>
                <div className="md:hidden text-center my-4 text-gray-400">OR</div>


                {/* Right Side: Username Login */}
                <div className="flex-1 pl-0 md:pl-12 pt-4 md:pt-0">
                    <LoginForm />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto w-full pt-16 pb-4">
                <div className="container max-w-5xl mx-auto flex flex-col md:flex-row justify-between text-xs font-bold text-[#333]">
                    <div className="text-center md:text-left mb-2 md:mb-0">
                        NPTEL HELPLINE: <span className="text-gray-500 font-normal">(044) 2257 5905</span> | <span className="text-gray-500 font-normal">(044) 2257 5908</span> |
                    </div>
                    <div className="text-center md:text-right">
                        email: <a href="mailto:support@nptel.iitm.ac.in" className="text-blue-600 hover:underline font-normal">support@nptel.iitm.ac.in</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoginForm() {
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // basic validation
        if (!formData.get('email') || !formData.get('password')) {
            setError("Please enter both email and password");
            return;
        }

        const result = await loginCandidate(formData);

        if (result.success) {
            router.push('/candidate_login');
        } else {
            setError(result.message || 'Login failed');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto md:mx-0">
            <div>
                <label className="block text-gray-700 text-sm mb-1" htmlFor="username">Email</label>
                <input
                    type="email"
                    name="email"
                    id="username"
                    placeholder="Email"
                    className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm mb-1" htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-600"
                />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-[#eee] hover:bg-[#ddd] text-gray-600 border border-[#ccc] px-6 py-2 rounded text-sm font-normal"
                >
                    Sign in
                </button>
            </div>

            <div className="text-center space-y-2 mt-4">
                <div>
                    <a href="#" className="text-blue-700 text-lg hover:underline">Forgot your password?</a>
                </div>
                <div className="flex items-center justify-center my-3 relative">
                    <div className="border-t border-gray-300 w-full absolute"></div>
                    <span className="bg-white px-2 text-gray-400 relative font-light text-lg">OR</span>
                </div>
                <div className="text-gray-500 text-lg">
                    Don't have an account? <a href="#" className="text-blue-700 hover:underline">Sign up now</a>
                </div>
            </div>

        </form>
    );
}