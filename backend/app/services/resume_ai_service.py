from openai import OpenAI
import os
import json

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def extract_resume_data(text):

    prompt = f"""
Extract the candidate information from this resume.

Return ONLY valid JSON.

{{
  "name": "",
  "email": "",
  "phone": "",
  "skills": [],
  "experience": "",
  "education": ""
}}

Rules:
- Extract the candidate's full name.
- Extract the primary email address.
- Extract the primary phone number.
- Extract all technical skills.
- Summarize work experience.
- Summarize education.
- Return only JSON.

Resume:

{text}
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

    content = response.choices[0].message.content

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)