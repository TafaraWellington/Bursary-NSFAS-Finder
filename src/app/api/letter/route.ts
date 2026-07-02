import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { bursaryName, studentProfile } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      You are an expert scholarship advisor. Write a professional, heartfelt, and persuasive motivational letter for a South African student applying for the ${bursaryName} bursary.
      
      Student Profile:
      - Field of Study: ${studentProfile.fieldOfStudy}
      - Province: ${studentProfile.province}
      - Special Circumstances: ${studentProfile.specialCircumstances?.join(', ') || 'None'}
      
      Requirements:
      1. Keep it under 400 words.
      2. Highlight resilience, academic potential, and financial need.
      3. Use placeholders like [Your Name], [Date], [Address] for the student to fill in.
      4. Make it sound authentic to a South African context.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ letter: response.text });
  } catch (error) {
    console.error("Letter generation error:", error);
    return NextResponse.json({ error: "Failed to generate letter" }, { status: 500 });
  }
}
