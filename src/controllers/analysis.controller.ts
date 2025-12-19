import { Request, Response } from "express";
import { extractPdfText } from "../utils/extractPdf.js";
import { buildPrompt } from "../utils/aiPrompt.js";
import { Analysis } from "../models/Analysis.js";
import { generateWithOllama } from "../services/ollama.service.js";
import { AuthenticatedRequest } from "../../type.js"; // Import your type

export const analyzeResume = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!file || !jobDescription) {
      return res.status(400).json({ message: "Missing resume or job description" });
    }

    const resumeText = await extractPdfText(file.buffer);

    const prompt = buildPrompt(resumeText, jobDescription);

    const aiRawResponse = await generateWithOllama(prompt);

    let aiResponse;
    try {

      const cleaned = aiRawResponse
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      aiResponse = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({
        message: "AI response parsing failed",
        raw: aiRawResponse
      });
    }

    const saved = await Analysis.create({
      userId: userId,
      matchScore: aiResponse.matchScore,
      missingKeywords: aiResponse.missingKeywords,
      suggestions: aiResponse.suggestions,
      jobDescription
    });

    res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resume analysis failed" });
  }
};
