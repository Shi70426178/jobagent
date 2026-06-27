from serpapi import GoogleSearch
import os

def search_hiring_posts():

    leads = []

    queries = [
        "dot net hiring",
        "remote python jobs"
    ]

    for query in queries:

        for start in [0, 10, 20, 30, 40]:

            params = {
                "engine": "google",
                "q": query,
                "tbs": "qdr:w",
                "num": 10,
                "start": start,
                "api_key": os.getenv("SERPAPI_KEY")
            }

            print(f"QUERY: {query} | START: {start}")

            search = GoogleSearch(params)

            results = search.get_dict()

            organic = results.get(
                "organic_results",
                []
            )

            print(
                "ORGANIC COUNT:",
                len(organic)
            )

            for item in organic:

                leads.append({
                    "company": "Unknown",
                    "title": item.get("title"),
                    "location": "Remote",
                    "source": "Google",
                    "url": item.get("link")
})

    print("TOTAL LEADS FOUND:", len(leads))

    return leads