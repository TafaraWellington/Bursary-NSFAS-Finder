"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

export default function LetterGeneratorPage() {
  const [draft, setDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLetter = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bursaryName: "NSFAS",
          studentProfile: {
            fieldOfStudy: "Computer Science",
            province: "Gauteng",
            specialCircumstances: ["first-generation"]
          }
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setDraft(data.letter);
      } else {
        alert("Failed to generate letter. Make sure your Gemini API key is configured.");
      }
    } catch (error) {
      console.error(error);
    }
    setIsGenerating(false);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-6 flex items-center">
        <Link href="/matches" className="text-gray-500 hover:text-gray-900 flex items-center text-sm font-medium">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Matches
        </Link>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Motivational Letter Draft</h1>
        <p className="text-gray-500 mb-8">Generate a personalized first-draft motivational letter using AI based on your profile.</p>

        {!draft ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
            <svg className="w-16 h-16 text-indigo-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <h3 className="text-xl font-medium text-gray-700 mb-4">No Draft Generated Yet</h3>
            <button 
              onClick={generateLetter}
              disabled={isGenerating}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm"
            >
              {isGenerating ? "Generating..." : "Generate AI Draft"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full h-96 p-6 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-relaxed resize-y"
            ></textarea>
            
            <div className="flex gap-4">
              <button className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Save & Download PDF
              </button>
              <button 
                onClick={generateLetter}
                disabled={isGenerating}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors"
              >
                {isGenerating ? "Regenerating..." : "Regenerate Draft"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
