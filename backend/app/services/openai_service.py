from openai import OpenAI
import os
import json

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_job_details(post_text):
    prompt = f"""
You are an expert recruitment extraction AI.

Analyze this LinkedIn post.

If this is NOT a hiring/recruitment/job post return:

{{
  "is_job_post": false
}}

If it IS a hiring post return:

{{
  "is_job_post": true,
  "recruiter": "",
  "company": "",
  "job_title": "",
  "location": "",
  "experience": "",
  "email": "",
  "skills": []
}}

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

    print("\n========== OPENAI RESPONSE ==========")
    print(content)

    content = content.replace(
        "```json",
        ""
    )

    content = content.replace(
        "```",
        ""
    )

    content = content.strip()

    return json.loads(content)