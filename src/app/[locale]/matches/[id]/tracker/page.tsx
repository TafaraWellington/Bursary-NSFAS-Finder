"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function DocumentTrackerPage() {
  const params = useParams();
  
  // In a real app, this would be fetched from the DB
  const [documents, setDocuments] = useState([
    { id: "id_copy", name: "Certified ID Copy", status: "uploaded", date: "2026-06-15" },
    { id: "matric", name: "Matric Results", status: "pending", date: null },
    { id: "proof_income", name: "Proof of Household Income", status: "rejected", date: "2026-07-01", note: "Document blurry, please re-upload." },
    { id: "motivation", name: "Motivational Letter", status: "pending", date: null },
  ]);

  const progress = Math.round((documents.filter(d => d.status === 'uploaded').length / documents.length) * 100);

  const toggleStatus = (id: string) => {
    setDocuments(docs => docs.map(d => {
      if (d.id === id) {
        return { ...d, status: d.status === 'uploaded' ? 'pending' : 'uploaded' };
      }
      return d;
    }));
  };

  return (
    <main className="p-8 max-w-3xl mx-auto min-h-screen">
      <div className="mb-6 flex items-center">
        <Link href="/matches" className="text-gray-500 hover:text-gray-900 flex items-center text-sm font-medium">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Matches
        </Link>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Tracker</h1>
            <p className="text-gray-500">Ensure all documents are uploaded before the deadline.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-indigo-600">{progress}%</div>
            <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-10 overflow-hidden">
          <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="space-y-4">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors">
              <div className="flex items-center flex-1">
                <button 
                  onClick={() => toggleStatus(doc.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${doc.status === 'uploaded' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}
                >
                  {doc.status === 'uploaded' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </button>
                <div>
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  {doc.status === 'rejected' && <p className="text-xs text-red-500 mt-1 font-medium">{doc.note}</p>}
                  {doc.status === 'uploaded' && <p className="text-xs text-gray-400 mt-1">Uploaded {doc.date}</p>}
                </div>
              </div>

              <div className="flex-shrink-0 ml-4">
                {doc.status === 'uploaded' ? (
                   <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full">Approved</span>
                ) : doc.status === 'rejected' ? (
                   <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1.5 rounded-full">Rejected</span>
                ) : (
                  <button className="text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
                    Upload
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
