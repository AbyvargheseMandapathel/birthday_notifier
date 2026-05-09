import uuid
import base64
from django.db import models
from django.conf import settings
from cryptography.fernet import Fernet
from django.utils.encoding import force_bytes, force_str
import hashlib

def get_fernet():
    # Derive a 32-byte key from Django's SECRET_KEY
    key = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
    return Fernet(base64.urlsafe_b64encode(key))

class EncryptedCharField(models.TextField):
    """Simple encrypted field using cryptography.fernet"""
    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        try:
            f = get_fernet()
            return force_str(f.decrypt(force_bytes(value)))
        except Exception:
            return value

    def get_prep_value(self, value):
        if value is None:
            return value
        f = get_fernet()
        return force_str(f.encrypt(force_bytes(value)))

class BirthdayRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='birthdays')
    
    # Encrypted fields
    friend_name = EncryptedCharField()
    contact_email = EncryptedCharField(null=True, blank=True)
    
    # Standard fields for filtering/sorting
    day = models.PositiveSmallIntegerField(default=1)
    month = models.PositiveSmallIntegerField(default=1)
    year = models.PositiveSmallIntegerField(blank=True, null=True)
    
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['month', 'day']

    def __str__(self):
        return f"Birthday Record for {self.user.email}"
