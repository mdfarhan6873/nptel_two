"use server";

import dbConnect from '../../lib/db';
import Candidate from '../../models/Candidate';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginCandidate(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await dbConnect();
        const candidate = await Candidate.findOne({ email });

        if (candidate && candidate.password === password) {
            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set('candidateId', candidate._id.toString(), { httpOnly: true, path: '/' });
            return { success: true };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: 'Something went wrong' };
    }
}
