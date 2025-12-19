import axios from "axios";

export const generateWithOllama = async (prompt: string) => {
  const response = await axios.post(process.env.OLLAMA_URL!, {
    model: process.env.MODEL,
    prompt,
    stream: false,
    options: {
      temperature: 0.2,
      num_ctx: 4096
    }
  });

  return response.data.response;
};
