from openai import OpenAI
import os
import json

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def extract_walkin_details(post_text):
    prompt = f"""
You are an expert recruitment AI.

Analyze the following LinkedIn WALK-IN hiring post.

Extract ONLY the following information and return valid JSON.

{{
  "company": "",
  "location": "",
  "walkin_date": "",
  "walkin_time": "",
  "venue": "",
  "experience": "",
  "positions": [],
  "skills": [],
  "contact_email": ""
}}

Rules:

- company = company name.
- location = city/state if mentioned.
- walkin_date = exact date or day (Monday, 25 July, etc.).
- walkin_time = interview timing.
- venue = complete venue/address.
- experience = experience required.
- positions = list of job positions.
- skills = list of important skills.
- contact_email = recruiter/company email if available.

If any field is missing:
- Return "" for strings.
- Return [] for arrays.

Return ONLY JSON.

POST:

{post_text}
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

    print("\n========== WALK-IN AI RESPONSE ==========")
    print(content)

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)