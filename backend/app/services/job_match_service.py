from openai import OpenAI
import os
import json

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def calculate_matches(
    skills,
    experience,
    jobs
):
    """
    Calculate match scores for multiple jobs
    using a single OpenAI API call.
    """

    jobs_text = ""

    for index, job in enumerate(jobs):
        jobs_text += f"""
JOB {index}:
Job Title: {job.job_title}
Company: {job.company}
Job Description:
{job.post_text}

"""


    prompt = f"""
Compare this candidate with the following job descriptions.

Candidate Skills:
{skills}

Candidate Experience:
{experience}

{jobs_text}

Return ONLY valid JSON.

The response must be an array with exactly one object
for every job, in the same order as the jobs provided.

Format:

[
  {{
    "score": 0,
    "reason": ""
  }}
]

Rules:

- score must be between 0 and 100
- give a short reason
- return exactly one result for every job
- keep the same order as the jobs
- do not include markdown
- do not include ```json
"""

    try:

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content.strip()

        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

        results = json.loads(content)

        if not isinstance(results, list):
            raise ValueError("OpenAI response is not a list")

        if len(results) != len(jobs):
            raise ValueError(
                f"Expected {len(jobs)} results, got {len(results)}"
            )

        return results

    except Exception as e:

        print("MATCH CALCULATION ERROR:", repr(e), flush=True)

        return [
            {
                "score": 0,
                "reason": "Unable to calculate match"
            }
            for _ in jobs
        ]