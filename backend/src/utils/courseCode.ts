/**
 * Canonicalizes a course code so "CSC301", "csc 301", and "  Csc301  " all
 * collapse to the same string. Needed because courseCode is free text (no
 * Course catalog table yet) — without this, near-duplicates silently break
 * "browse tutors by course code" matching.
 */
export function normalizeCourseCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}
