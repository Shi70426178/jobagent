from openai import OpenAI
import os
import json

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_job_details(post_text):
    prompt = f"""
You are an expert recruitment AI.

Analyze the following LinkedIn post.

If this is NOT a hiring/job/recruitment post return ONLY:

{{
  "is_job_post": false
}}

If it IS a hiring post return ONLY valid JSON in this format:

{{
  "is_job_post": true,
  "recruiter": "",
  "company": "",
  "job_title": "",
  "department": "",
  "industry": "",
  "location": "",
  "posted_time": "",
  "experience": "",
  "employment_type": "",
  "salary": "",
  "email": "",
  "skills": []
}}

Rules:

- recruiter = recruiter name if available.
- company = company name.
- job_title = exact job title.
- department = examples: IT, HR, Finance, Sales, Marketing, Healthcare, Education, Legal, Logistics.
- industry = examples: Software, Banking, Healthcare, Construction, Retail, Education.
- location = city, state, country or Remote.
- posted_time = time since the post was published (examples: "2h", "5 hours ago", "1 day ago", "3 weeks ago"). Return "" if not available.
- experience = experience required.
- employment_type = Full Time, Part Time, Internship, Contract, Freelance, Remote.
- salary = salary if mentioned, otherwise "".
- email = recruiter email if available.
- skills = list of important skills or technologies mentioned.

If a field is not available, return an empty string "".
For skills, return an empty list [] if none are mentioned.

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

    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    return json.loads(content)