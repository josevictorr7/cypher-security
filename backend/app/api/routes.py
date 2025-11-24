from fastapi import APIRouter
from app.models.message import EncryptIn, EncryptOut, DecryptIn, DecryptOut
from app.services.cryptoservices import encrypt_message, decrypt_message

router = APIRouter()

@router.post("/encrypt", response_model=EncryptOut)
def encrypt(data: EncryptIn):
    encrypted = encrypt_message(data.text, data.key)
    return EncryptOut(token=encrypted)

@router.post("/decrypt", response_model=DecryptOut)
def decrypt(data: DecryptIn):
    decrypted = decrypt_message(data.token, data.key)
    return DecryptOut(text=decrypted)
