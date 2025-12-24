import axios from "axios";

export const generateWithOllama = async (prompt: string) => {
  const response = await axios.post(
    process.env.BACKEND_BASE_URL!, {
    model: process.env.MODEL,
    prompt,
    stream: false,
    options: {
      temperature: 0.2,
      num_ctx: 4096
    }
  },
    {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      // timeout: 600_000, // 10 minutes
    }
  );
  return response.data.response;
};
