from pydantic import BaseModel

class EncryptIn(BaseModel):
    text: str
    key: str

class EncryptOut(BaseModel):
    token: str

class DecryptIn(BaseModel):
    token: str
    key: str

class DecryptOut(BaseModel):
    text: str
