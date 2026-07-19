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


def send_email(
    to_email: str,
    subject: str,
    body: str,
    html: bool = False,
):
    message = MIMEMultipart()

    message["From"] = SMTP_FROM
    message["To"] = to_email
    message["Subject"] = subject

    message.attach(
        MIMEText(
            body,
            "html" if html else "plain"
        )
    )

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

def send_reset_password_email(
    to_email: str,
    token: str,
):

    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"

    body = f"""
    Hi,

    We received a request to reset your password.

    Click the link below:

    {reset_link}

    This link expires in 30 minutes.

    If you didn't request this, simply ignore this email.

    Team oneXjob
    """

    send_email(
        to_email,
        "Reset your oneXjob password",
        body
    )

def send_welcome_email(to_email: str, name: str):
    subject = "Welcome to oneXjob 🚀"

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2>Welcome to oneXjob, {name}! 👋</h2>

        <p>Thank you for joining <b>oneXjob</b>.</p>

        <p>
            We're excited to help you find better job opportunities using AI.
        </p>

        <h3>Get started in 3 simple steps:</h3>

        <ol>
            <li>Upload your resume</li>
            <li>Connect your Gmail account</li>
            <li>Launch the AI Job Agent</li>
        </ol>

        <p>
            Once you're set up, oneXjob can:
        </p>

        <ul>
            <li>🎯 Find relevant jobs</li>
            <li>📄 Match jobs with your resume</li>
            <li>✉️ Generate personalized application emails</li>
            <li>📊 Track your applications</li>
        </ul>

        <p>
            <a href="https://onexjob.com/dashboard"
               style="background:#4F46E5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;">
               Go to Dashboard
            </a>
        </p>

        <p>
            Happy job hunting!<br>
            <b>Team oneXjob</b>
        </p>

    </body>
    </html>
    """

    send_email(
        to_email,
        subject,
        html,
        html=True
    )