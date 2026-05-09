import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    timezone = models.CharField(max_length=50, default='UTC')
    is_active = models.BooleanField(default=True)
    
    # Reminder Settings
    reminder_days_before = models.PositiveSmallIntegerField(default=2)
    reminder_time = models.TimeField(default='09:00:00')
    is_smart_reminders_enabled = models.BooleanField(default=True)
    
    # Engagement Stats
    streak_count = models.PositiveIntegerField(default=0)
    total_wishes_sent = models.PositiveIntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
