import os
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))

SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM = os.getenv("SMTP_FROM")

FRONTEND_URL = os.getenv("FRONTEND_URL")


def send_reset_password_email(
    to_email: str,
    token: str,
):

    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"

    message = MIMEMultipart()

    message["From"] = SMTP_FROM
    message["To"] = to_email
    message["Subject"] = "Reset your oneXjob password"

    body = f"""
Hi,

We received a request to reset your password.

Click the link below:

{reset_link}

This link expires in 30 minutes.

If you didn't request this, simply ignore this email.

Team oneXjob
"""

    message.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL(
        SMTP_HOST,
        SMTP_PORT
    ) as server:

        server.login(
            SMTP_USER,
            SMTP_PASSWORD
        )

        server.sendmail(
            SMTP_FROM,
            to_email,
            message.as_string()
        )