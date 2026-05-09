from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import BirthdayRecord
from datetime import date
from django.contrib.auth import get_user_model

User = get_user_model()

@shared_task
def send_daily_birthday_reminders():
    today = date.today()
    # Filter birthdays happening today
    birthdays_today = BirthdayRecord.objects.filter(
        month=today.month,
        day=today.day
    ).select_related('user')

    # Group by user
    user_notifications = {}
    for record in birthdays_today:
        user_email = record.user.email
        if user_email not in user_notifications:
            user_notifications[user_email] = []
        user_notifications[user_email].append(record.friend_name)

    # Send emails
    for email, friends in user_notifications.items():
        subject = "Birthday Reminder: Don't forget your friends today!"
        friends_list = "\n- ".join(friends)
        message = f"Hi,\n\nToday is the birthday of the following friends:\n\n- {friends_list}\n\nHave a great day!"
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL or 'noreply@birthdayreminder.com',
            [email],
            fail_silently=False,
        )

    return f"Sent reminders to {len(user_notifications)} users."
