from openai import OpenAI
import os
import json

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def calculate_match(
    skills,
    experience,
    job_description
):

    prompt = f"""
Compare this candidate with the job description.

Candidate Skills:
{skills}

Candidate Experience:
{experience}

Job Description:
{job_description}

Return ONLY valid JSON.

{{
    "score": 0,
    "reason": ""
}}

Rules:
- score must be between 0 and 100
- explain briefly why the score was given
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

    content = content.replace(
        "```json",
        ""
    )

    content = content.replace(
        "```",
        ""
    )

    content = content.strip()

    try:

        return json.loads(content)

    except Exception:

        return {
            "score": 0,
            "reason": "Unable to calculate match"
        }