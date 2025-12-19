
export const buildPrompt = (resumeText: string, jobDescription: string) => {
  return `
You are an ATS resume analyzer.

Compare the RESUME with the JOB DESCRIPTION and return STRICT JSON only.

JSON FORMAT:
{
  "matchScore": number (0-100),
  "missingKeywords": string[],
  "suggestions": string[]
}

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
