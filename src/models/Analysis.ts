import { Schema, model } from "mongoose";

const analysisSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    jobDescription: String,
    matchScore: Number,
    missingKeywords: [String],
    suggestions: String
  },
  { timestamps: true }
);

export const Analysis = model("Analysis", analysisSchema);
