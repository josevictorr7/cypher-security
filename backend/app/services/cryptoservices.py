from cryptography.fernet import Fernet
import base64
import hashlib

def generate_key_from_password(password: str) -> bytes:
    key = hashlib.sha256(password.encode()).digest()
    return base64.urlsafe_b64encode(key)

def encrypt_message(text: str, password: str) -> str:
    key = generate_key_from_password(password)
    cipher = Fernet(key)
    return cipher.encrypt(text.encode()).decode()

def decrypt_message(token: str, password: str) -> str:
    key = generate_key_from_password(password)
    cipher = Fernet(key)
    return cipher.decrypt(token.encode()).decode()
