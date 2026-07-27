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
  "title": "",
  "location": "",
  "walkin_date": "",
  "walkin_time": "",
  "venue": "",
  "experience": "",
  "positions": [],
  "skills": [],
  "employment_type": "",
  "salary": "",
  "contact_email": ""
}}

Rules:

- company = company name if mentioned.
- title = title of the walk-in drive or hiring event (example: "Walk-In Drive for IT Professionals", "Mega Walk-In Drive").
- location = city/state if mentioned.
- walkin_date = exact interview date or day.
- walkin_time = interview timing.
- venue = complete interview venue/address.
- experience = experience required.
- positions = list of all job positions mentioned.
- skills = list of required skills or technologies.
- employment_type = Full Time, Internship, Contract, Part Time, etc. if mentioned.
- salary = salary if mentioned, otherwise "".
- contact_email = recruiter/company email if available.

If a field is not available:
- Return "" for strings.
- Return [] for arrays.

Return ONLY valid JSON.

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