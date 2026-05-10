from rest_framework import serializers
from .models import BirthdayRecord
from datetime import date

class BirthdayRecordSerializer(serializers.ModelSerializer):
    age_turning = serializers.SerializerMethodField()
    days_until = serializers.SerializerMethodField()

    class Meta:
        model = BirthdayRecord
        fields = ('id', 'friend_name', 'day', 'month', 'year', 'notes', 'contact_email', 'relationship', 'group', 'age_turning', 'days_until', 'created_at')
        read_only_fields = ('id', 'created_at')

    def get_age_turning(self, obj):
        if not obj.year:
            return None
        today = date.today()
        return today.year - obj.year

    def get_days_until(self, obj):
        today = date.today()
        try:
            next_birthday = date(today.year, obj.month, obj.day)
        except ValueError:
            # Handle Feb 29 for non-leap years
            next_birthday = date(today.year, 3, 1) # Treat as March 1st or handle as needed
            
        if next_birthday < today:
            try:
                next_birthday = date(today.year + 1, obj.month, obj.day)
            except ValueError:
                next_birthday = date(today.year + 1, 3, 1)
                
        return (next_birthday - today).days
