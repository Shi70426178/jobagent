from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_email(
    resume,
    job_title,
    company,
    post_text
):

    prompt = f"""
Write a professional job application email.

Candidate Name:
{resume.name}

Candidate Email:
{resume.email}

Candidate Phone:
{resume.phone}

Candidate Skills:
{resume.skills}

Candidate Experience:
{resume.experience}

Candidate Education:
{resume.education}

Company:
{company}

Job Title:
{job_title}

Job Post:
{post_text}

Requirements:
- Do NOT include a "Subject:" line in the email body.
- The subject is provided separately.
- Start directly with the greeting (Dear ...).
- Mention that the resume is attached.
- End with:
  Best Regards,
  {resume.name}
  {resume.email}
  {resume.phone}

Return only the email body.
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return (
        response
        .choices[0]
        .message
        .content
    )