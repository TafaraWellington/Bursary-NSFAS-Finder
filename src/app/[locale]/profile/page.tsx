export default function ProfilePage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
      <form className="space-y-4" action="/api/match" method="POST">
        <div>
          <label className="block mb-2 font-medium">Intended Field of Study</label>
          <input type="text" name="fieldOfStudy" className="w-full border p-2 rounded" placeholder="e.g. Engineering" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Household Income (ZAR)</label>
          <input type="number" name="income" className="w-full border p-2 rounded" placeholder="350000" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Province</label>
          <select name="province" className="w-full border p-2 rounded">
            <option value="">Select Province</option>
            <option value="Gauteng">Gauteng</option>
            <option value="Western Cape">Western Cape</option>
            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
            {/* Add others */}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Academic Average (%)</label>
          <input type="number" name="average" className="w-full border p-2 rounded" placeholder="70" />
        </div>
        <button type="submit" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600">
          Find Matches
        </button>
      </form>
    </main>
  );
}
