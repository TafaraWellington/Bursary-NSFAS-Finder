"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function MatchesDashboard() {
  // In a real app, this would be fetched from the database for the current student
  const mockMatches = [
    { id: 1, name: "NSFAS", score: 95, reason: "Matches household income threshold (<R350k) and is eligible for all public universities.", deadline: "2026-11-30" },
    { id: 2, name: "Sasol Foundation Bursary", score: 85, reason: "Matches intended field of study (Engineering) and academic average (>70%).", deadline: "2026-09-15" },
    { id: 3, name: "Allan Gray Orbis Foundation", score: 70, reason: "Excellent academic record, highly recommended for entrepreneurial students.", deadline: "2026-08-31" },
  ];

  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Your Bursary Matches</h1>
      <p className="text-gray-600 mb-10">Based on your academic profile and financial background, we've found the following opportunities for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMatches.map(match => (
          <div key={match.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{match.name}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                {match.score}% Match
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 flex-grow">{match.reason}</p>
            
            <div className="text-xs text-gray-500 mb-6 flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Deadline: {match.deadline}
            </div>

            <div className="flex gap-3 mt-auto">
              <Link 
                href={`/matches/${match.id}/tracker`}
                className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Tracker
              </Link>
              <Link 
                href={`/matches/${match.id}/letter`}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white text-center py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Draft Letter
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
