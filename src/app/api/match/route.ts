import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bursaries, studentMatches } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const studentProfile = await req.json();
    
    // In a real app, you would fetch all bursaries and filter them based on the logic
    const allBursaries = await db.select().from(bursaries);
    const matchesToInsert = [];
    const results = [];

    for (const b of allBursaries) {
      let score = 0;
      let matchReasons = [];

      // Logic check: Academic average
      if (b.minAcademicAverage && studentProfile.average >= b.minAcademicAverage) {
        score += 40;
        matchReasons.push(`Meets academic requirement of ${b.minAcademicAverage}%`);
      } else if (b.minAcademicAverage) {
        continue; // Hard requirement not met
      }

      // Logic check: Household income
      if (b.maxHouseholdIncome && studentProfile.income <= b.maxHouseholdIncome) {
        score += 30;
        matchReasons.push(`Falls within household income threshold`);
      } else if (b.maxHouseholdIncome) {
        continue; // Hard requirement not met
      }

      // Logic check: Field of Study
      if (b.eligibleFieldsOfStudy && Array.isArray(b.eligibleFieldsOfStudy)) {
        if (b.eligibleFieldsOfStudy.includes(studentProfile.fieldOfStudy)) {
          score += 30;
          matchReasons.push(`Matches field of study: ${studentProfile.fieldOfStudy}`);
        } else {
          continue; // Hard requirement not met
        }
      }

      // Logic check: Province
      if (b.eligibleProvinces && Array.isArray(b.eligibleProvinces)) {
        if (b.eligibleProvinces.includes(studentProfile.province)) {
          score += 20;
          matchReasons.push(`Eligible for residents of ${studentProfile.province}`);
        } else {
          continue; // Hard requirement not met
        }
      }

      // Logic check: Special Circumstances
      if (b.specialCircumstances && Array.isArray(b.specialCircumstances)) {
        const hasCircumstance = b.specialCircumstances.some(c => studentProfile.specialCircumstances?.includes(c));
        if (hasCircumstance) {
          score += 20;
          matchReasons.push(`Matches special circumstances`);
        } else {
          continue; // Hard requirement not met
        }
      }

      // Prepare match record
      const matchScore = Math.min(score, 100);
      if (matchScore > 0 || score === 0) {
        // Even if score is 0, if they didn't hit a continue, they might be fully eligible for a broad bursary like NSFAS
        const finalScore = score === 0 ? 100 : matchScore; // If no specific constraints were tested but they passed, it's a 100% match.
        const reason = matchReasons.length > 0 ? matchReasons.join(', ') : 'Eligible based on general criteria';
        
        matchesToInsert.push({
          studentId: studentProfile.studentId,
          bursaryId: b.id,
          matchScore: finalScore,
          matchReason: reason,
          documentProgress: {}
        });

        results.push({ bursary: b, score: finalScore, reason });
      }
    }

    if (matchesToInsert.length > 0) {
      // await db.insert(studentMatches).values(matchesToInsert);
      // Commented out for now as we don't have real studentIds from auth yet
    }

    return NextResponse.json({ matches: results });
  } catch (error) {
    console.error("Match error:", error);
    return NextResponse.json({ error: "Failed to process matches" }, { status: 500 });
  }
}
