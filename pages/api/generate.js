// pages/api/generate.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { contents } = req.body;

  if (!contents) {
    return res.status(400).json({ error: "Missing contents" });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}
