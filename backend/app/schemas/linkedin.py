from pydantic import BaseModel

class UpdateEmailRequest(BaseModel):
    generated_email: str