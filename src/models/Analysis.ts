import { Schema, model } from "mongoose";

const suggestionSchema = new Schema(
  {
    keyword: { type: String, required: true },
    justification: { type: String, required: true }
  },
  { _id: false }
);

const analysisSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    jobDescription: String,
    matchScore: Number,
    missingKeywords: [String],
    suggestions: [suggestionSchema]
  },
  { timestamps: true }
);

export const Analysis = model("Analysis", analysisSchema);
