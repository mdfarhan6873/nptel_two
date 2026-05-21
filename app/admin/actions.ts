"use server";

import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../../lib/db';
import Candidate from '../../models/Candidate';
import { CONFIG } from '../../lib/config';

// Configure Cloudinary
cloudinary.config({
    cloud_name: CONFIG.CLOUDINARY.CLOUD_NAME,
    api_key: CONFIG.CLOUDINARY.API_KEY,
    api_secret: CONFIG.CLOUDINARY.API_SECRET,
});

export async function createCandidate(prevState: any, formData: FormData) {
    try {
        await dbConnect();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const courseName = formData.get('courseName') as string;
        let rollNo = formData.get('rollNo') as string;
        const timeline = formData.get('timeline') as string;
        const courseDuration = formData.get('courseDuration') as string;

        // Auto-generate Roll Number if empty
        if (!rollNo || rollNo.trim() === "" || rollNo === "Auto-generated") {
            // Try to extract year from timeline (e.g., "Jul-Oct 2025")
            let year = new Date().getFullYear().toString().slice(-2);
            const yearMatch = timeline.match(/\d{4}/);
            if (yearMatch) {
                year = yearMatch[0].slice(-2);
            }
            const randomSuffix = Math.random().toString(36).substring(2, 11).toUpperCase(); // slightly shorter suffix
            rollNo = `NPTEL${year}HS${randomSuffix}`;
        }

        const dob = formData.get('dob') as string;

        // Assignment scores (comma separated or handled differently)
        // Assuming simple comma separated string input for simplicity in form
        const assignmentScoresStr = formData.get('assignmentScores') as string;
        const assignmentScores = assignmentScoresStr.split(',').map(s => Number(s.trim()));

        const examScore = Number(formData.get('examScore'));
        const profileImage = formData.get('profileImage') as File;

        // Upload Image
        let profileImageUrl = "";
        if (profileImage && profileImage.size > 0) {
            const arrayBuffer = await profileImage.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Wrap stream upload in promise
            const uploadResponse: any = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "nptel-candidates" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            profileImageUrl = uploadResponse.secure_url;
        }

        // Upload Signatures
        const sig1Image = formData.get('sig1Image') as File;
        const sig1Name = formData.get('sig1Name') as string;
        const sig1Designation = formData.get('sig1Designation') as string;

        const sig2Image = formData.get('sig2Image') as File;
        const sig2Name = formData.get('sig2Name') as string;
        const sig2Designation = formData.get('sig2Designation') as string;

        let sig1ImageUrl = "";
        if (sig1Image && sig1Image.size > 0) {
            const arrayBuffer = await sig1Image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResponse: any = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "nptel-signatures" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            sig1ImageUrl = uploadResponse.secure_url;
        }

        let sig2ImageUrl = "";
        if (sig2Image && sig2Image.size > 0) {
            const arrayBuffer = await sig2Image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResponse: any = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "nptel-signatures" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            sig2ImageUrl = uploadResponse.secure_url;
        }

        // Calculation Logic (Simplified based on screenshots/request)
        // "Assignment Score = Average of best 8 out of 12 assignments"
        // "Final Score = 75% of Exam Score + 25% of Assignment Score"

        // 1. Calculate Assignment Average (Best 8)
        const sortedScores = [...assignmentScores].sort((a, b) => b - a);
        const best8 = sortedScores.slice(0, 8);
        const sumBest8 = best8.reduce((a, b) => a + b, 0);
        const assignmentScoreAvg = best8.length > 0 ? sumBest8 / best8.length : 0; // This is out of 100 usually, but NPTEL scales it to 25.
        // Wait, NPTEL usually has assignments out of 100. Best 8 avg is out of 100.
        // Then 25% of that is taken.
        // Let's assume input scores are out of 100.

        // "21.88/25" in partial screenshot implies the stored/calculated assignment score is the weighted one.
        // Formula says: "Final Score = 75% of Exam Score + 25% of Assignment Score"
        // Usually it means (Exam/100 * 75) + (AssignmentAvg/100 * 25).
        // Let's calculate the weighted values.

        const weightedAssignmentScore = (assignmentScoreAvg * 0.25);
        // Exam score is usually out of 100 or 75 directly?
        // Screenshot: "Exam score out of 75: 48". So input is raw score out of 75?
        // "Final Score out of 100: 70".
        // 48 + 21.88 = 69.88 ~ 70.
        // So Exam Score is taken as absolute. Assignment Score is calculated out of 25.

        const finalScore = Math.round(examScore + weightedAssignmentScore);

        // Certificate Criteria
        // >=90 Elite + Gold
        // 75-89 Elite + Silver
        // >=60 Elite
        // 40-59 Successfully Completed
        let certificateType = "Successfully Completed";
        if (finalScore >= 90) certificateType = "Elite + Gold";
        else if (finalScore >= 75) certificateType = "Elite + Silver";
        else if (finalScore >= 60) certificateType = "Elite";

        const instituteName = formData.get('instituteName') as string || "Indian Institute of Technology Roorkee";
        const creditsRecommended = formData.get('creditsRecommended') as string || "3 or 4";
        const totalCandidates = Number(formData.get('totalCandidates')) || 12417;

        const newCandidate = new Candidate({
            name,
            email,
            password,
            profileImage: profileImageUrl,
            dob,
            courseName,
            rollNo,
            timeline,
            courseDuration,
            assignmentScores,
            examScore,
            assignmentScoreAvg: weightedAssignmentScore.toFixed(2),
            finalScore,
            certificateType,
            creditsRecommended,
            totalCandidates,
            instituteName,
            signature1: {
                image: sig1ImageUrl,
                name: sig1Name,
                designation: sig1Designation
            },
            signature2: {
                image: sig2ImageUrl,
                name: sig2Name,
                designation: sig2Designation
            }
        });

        await newCandidate.save();

        return { 
            success: true, 
            message: "Candidate created successfully!", 
            candidateId: newCandidate._id.toString(),
            rollNo: newCandidate.rollNo 
        };

    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message };
    }
}
