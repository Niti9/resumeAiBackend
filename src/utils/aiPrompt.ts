// export const buildPrompt = (resumeText: string, jobDescription: string) => {
//   return `
// You are an ATS resume analyzer.

// Compare the RESUME with the JOB DESCRIPTION and return ONLY valid JSON.
// Do NOT use markdown.
// Do NOT add explanations.
// Use DOUBLE QUOTES ONLY.

// JSON FORMAT (STRICT):
// {
//   "matchScore": number,
//   "missingKeywords": string[],
//   "suggestions":  [
//     {
//       "keyword": string,
//       "justification": string
//     }
//   ]
// }

// Rules:
// - "suggestions" MUST be an array of objects
// - Each object MUST contain "keyword" and "justification"
// - Do NOT return strings inside "suggestions"
// - Do NOT add extra fields
// - Do NOT include any text outside JSON

// RESUME:
// """
// ${resumeText}
// """

// JOB DESCRIPTION:
// """
// ${jobDescription}
// """
// `;
// };



export const buildPrompt = (resumeText: string, jobDescription: string) => {
  return `
You are an ATS (Applicant Tracking System) resume evaluator.

Your task is to objectively compare the RESUME with the JOB DESCRIPTION
and return a structured evaluation based strictly on the JOB DESCRIPTION.

EVALUATION RULES:
- Identify skills, technologies, and experience that are explicitly required in the JOB DESCRIPTION.
- Check whether each required item is clearly present in the RESUME.
- Do NOT assume equivalent skills unless they are clearly stated.
- Do NOT invent missing skills.

MATCH SCORE RULES:
- Calculate matchScore based on how many required skills and experiences from the JOB DESCRIPTION
  are clearly present in the RESUME.
- A higher score means higher coverage of JD requirements.
- Use the full 0–100 range honestly.

MISSING KEYWORDS RULE:
- "missingKeywords" must list ONLY the required skills or technologies
  mentioned in the JOB DESCRIPTION that are NOT found in the RESUME.
- If all required items are present, return an empty array [].

SUGGESTIONS RULE:
- Suggestions must be helpful and accurate.
- If skills are missing, suggestions may explain how addressing those skills would improve the match.
- If no required skills are missing, suggestions must focus ONLY on improving presentation,
  clarity, impact, or depth of existing skills.
- Suggestions MUST reference either a missing keyword or an existing resume skill.
- NEVER suggest unrelated or invented technologies.

JSON FORMAT (STRICT — RETURN ONLY JSON):
{
  "matchScore": number,
  "missingKeywords": string[],
  "suggestions": [
    {
      "keyword": string,
      "justification": string
    }
  ]
}

Use DOUBLE QUOTES ONLY.
Do NOT use markdown.
Do NOT include explanations or text outside JSON.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""
`;
};
