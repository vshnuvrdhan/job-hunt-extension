export function buildFollowUpPrompt({
  company,
  role,
  appliedDate,
  intent,
  extra
}) {
  const daysSince =
    Math.floor(
      (Date.now() - new Date(appliedDate)) / (1000 * 60 * 60 * 24)
    );

  return `
You are a professional email assistant helping a job applicant write a follow-up email.

Context:
Company: ${company}
Role: ${role}
Date applied: ${appliedDate}
Days since application: ${daysSince}

Follow-up intent:
"${intent}"

Guidelines:
- Be polite, professional, and confident
- Do not sound desperate or impatient
- Do not assume outcomes
- Keep the email concise
- Adjust tone based on time elapsed
- Do not include a subject line
- Output only the email body

Additional instructions:
${extra || "None"}

Write the follow-up email now.
`;
}
