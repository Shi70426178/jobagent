from datetime import datetime, timedelta
from sqlalchemy import or_
from app.models.linkedin_post import LinkedInPost
from app.models.linkedin_job import LinkedInJob


# Location aliases (normalized to lowercase keys)
LOCATION_MAP = {
    "bangalore": [
        "Bangalore", "Bengaluru", "Greater Bengaluru", "Bellandur",
        "Koramangala", "Manyata Tech Park", "North Bangalore",
        "JP Nagar", "Domlur", "Sarjapura", "BLR"
    ],

    "hyderabad": [
        "Hyderabad", "Kondapur", "Malakpet",
        "Hyderabad, India", "Hyderabad, Andhra Pradesh"
    ],

    "mumbai": [
        "Mumbai", "Navi Mumbai", "Andheri", "Powai",
        "Thane", "Goregaon", "Lower Parel",
        "Kajurmarg", "Mira Road", "Chandivali"
    ],

    "delhi": [
        "Delhi", "New Delhi", "Delhi NCR",
        "NCR", "South Delhi", "Model Town",
        "Dwarka", "Nehru Place", "Rajendra Place"
    ],

    "gurgaon": [
        "Gurgaon", "Gurugram",
        "Sector 49", "Sector 74A"
    ],

    "noida": [
        "Noida", "Greater Noida",
        "Greater Noida West",
        "Sector 2", "Sector 6",
        "Sector 62", "Sector 63",
        "Sector 126"
    ],

    "faridabad": [
        "Faridabad"
    ],

    "ghaziabad": [
        "Ghaziabad"
    ],

    "pune": [
        "Pune", "Baner", "Pashan",
        "Bibwewadi", "Kalyani Nagar",
        "Magarpatta", "Shivajinagar",
        "Pune District", "Pune Division"
    ],

    "chennai": [
        "Chennai", "OMR",
        "Perambur", "Thiruporur"
    ],

    "ahmedabad": [
        "Ahmedabad", "Bopal",
        "Makarba", "Nikol",
        "Katraj", "SG Highway",
        "Sindhu Bhavan"
    ],

    "gandhinagar": [
        "Gandhinagar",
        "Kudasan",
        "Khatraj"
    ],

    "surat": [
        "Surat",
        "Vesu",
        "Katargam"
    ],

    "vadodara": [
        "Vadodara",
        "Savli",
        "Manjusar"
    ],

    "rajkot": [
        "Rajkot",
        "Morbi Road"
    ],

    "indore": [
        "Indore",
        "Nipania",
        "Jaora Compound"
    ],

    "bhopal": [
        "Bhopal"
    ],

    "raipur": [
        "Raipur"
    ],

    "jaipur": [
        "Jaipur",
        "Kukas"
    ],

    "lucknow": [
        "Lucknow",
        "Raebareli"
    ],

    "kanpur": [
        "Kanpur"
    ],

    "patna": [
        "Patna"
    ],

    "nagpur": [
        "Nagpur",
        "MIHAN"
    ],

    "nashik": [
        "Nashik"
    ],

    "coimbatore": [
        "Coimbatore"
    ],

    "kochi": [
        "Kochi",
        "Cochin"
    ],

    "kozhikode": [
        "Kozhikode",
        "Calicut"
    ],

    "trivandrum": [
        "Trivandrum",
        "Technopark",
        "Thiruvananthapuram"
    ],

    "mohali": [
        "Mohali"
    ],

    "chandigarh": [
        "Chandigarh"
    ],

    "kolkata": [
        "Kolkata",
        "Salt Lake",
        "Sector V",
        "Camac Street",
        "Madhyamgram"
    ],

    "goa": [
        "Goa",
        "Margao"
    ],

    "kerala": [
        "Kerala"
    ],

    "remote": [
        "Remote",
        "100% Remote",
        "Work From Home",
        "WFH",
        "Permanent Remote",
        "Anywhere",
        "Anywhere in India",
        "India (Remote)",
        "Remote (India)",
        "Remote, India",
        "Remote / Work From Home",
        "Remote/Hybrid",
        "Hybrid/Remote",
        "India (WFH)",
        "Remote (USA)",
        "USA (Remote)",
        "United States (Remote)"
    ]
}


def get_recent_jobs(
    db,
    user_id,
    keyword,
    location=None
):

    last_7_days = datetime.utcnow() - timedelta(days=7)

    query = (
        db.query(LinkedInJob)
        .filter(
            LinkedInJob.scraped_at >= last_7_days,
            or_(
                LinkedInJob.job_title.ilike(f"%{keyword}%"),
                LinkedInJob.search_keyword.ilike(f"%{keyword}%"),
                LinkedInJob.skills.ilike(f"%{keyword}%")
            )
        )
    )

    # Location filter
    if location and location.strip():

        normalized_location = location.strip().lower()

        aliases = LOCATION_MAP.get(
            normalized_location,
            [normalized_location]
        )

        query = query.filter(
            or_(
                *[
                    LinkedInJob.location.ilike(f"%{alias}%")
                    for alias in aliases
                ]
            )
        )

    shown_jobs = (
        db.query(LinkedInPost.linkedin_job_id)
        .filter(
            LinkedInPost.user_id == user_id
        )
    )

    query = query.filter(
        ~LinkedInJob.id.in_(shown_jobs)
    )

    return (
        query.order_by(
            LinkedInJob.scraped_at.desc()
        )
        .limit(10)
        .all()
    )