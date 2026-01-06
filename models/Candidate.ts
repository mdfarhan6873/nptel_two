import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
    // Personal Details
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Simple password for now
    dob: { type: String },
    profileImage: { type: String }, // Cloudinary URL

    // Course Details
    courseName: { type: String, required: true },
    rollNo: { type: String, required: true },
    timeline: { type: String, required: true }, // e.g., "Jul-Oct 2025"
    courseDuration: { type: String }, // e.g., "12 week course"

    // Marks
    assignmentScores: { type: [Number], default: [] }, // Array of 8 or 12 scores
    examScore: { type: Number, required: true }, // Out of 75
    assignmentScoreAvg: { type: Number }, // Out of 25 (calculated)
    finalScore: { type: Number }, // Out of 100

    // Certificate Details
    certificateType: { type: String }, // Elite, Elite+Gold, etc.
    creditsRecommended: { type: String }, // e.g., "3 or 4"
    totalCandidates: { type: Number }, // For "Total number of candidates certified in this course"
    instituteName: { type: String, default: "Indian Institute of Technology Roorkee" },

    // Signature/Admin uploads
    signature1: {
        image: { type: String },
        name: { type: String },
        designation: { type: String }
    },
    signature2: {
        image: { type: String },
        name: { type: String },
        designation: { type: String }
    }
}, { timestamps: true });

export default mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema);
