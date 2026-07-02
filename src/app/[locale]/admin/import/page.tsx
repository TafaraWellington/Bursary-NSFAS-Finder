"use client";

import { useState } from "react";
import Papa from "papaparse";
import { useTranslations } from "next-intl";

export default function AdminImportPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    }
  };

  const processImport = async () => {
    setLoading(true);
    // In a real app, we would send this data to an API route to insert into the DB
    // e.g. await fetch('/api/admin/import', { method: 'POST', body: JSON.stringify(data) })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Successfully imported ${data.length} students and calculated their matches!`);
    setData([]);
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold mb-2">Bulk Import Students</h1>
        <p className="text-gray-500 mb-8">Upload a CSV file containing your class list. The system will automatically create profiles and calculate bursary matches for every student.</p>
        
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
          />
        </div>

        {data.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Preview ({data.length} students found)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-4 py-3 font-medium text-gray-700">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="px-4 py-3 text-gray-600">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 5 && <p className="text-sm text-gray-400 mt-4 text-center">Showing first 5 rows...</p>}
            </div>

            <button 
              onClick={processImport}
              disabled={loading}
              className="mt-6 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-8 rounded-xl transition-colors"
            >
              {loading ? "Processing..." : "Confirm & Import"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
