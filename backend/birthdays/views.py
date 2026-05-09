from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BirthdayRecord
from .serializers import BirthdayRecordSerializer
from datetime import date, timedelta

class BirthdayRecordViewSet(viewsets.ModelViewSet):
    serializer_class = BirthdayRecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['friend_name']
    ordering_fields = ['month', 'day', 'friend_name']

    def get_queryset(self):
        return BirthdayRecord.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        today = date.today()
        end_date = today + timedelta(days=30)
        
        queryset = self.get_queryset()
        upcoming_records = []
        
        for record in queryset:
            try:
                bday_this_year = date(today.year, record.month, record.day)
            except ValueError:
                bday_this_year = date(today.year, 3, 1) # Handle leap year edge case
                
            try:
                bday_next_year = date(today.year + 1, record.month, record.day)
            except ValueError:
                bday_next_year = date(today.year + 1, 3, 1)
            
            if today <= bday_this_year <= end_date or today <= bday_next_year <= end_date:
                upcoming_records.append(record)
        
        # Sort by proximity
        upcoming_records.sort(key=lambda x: self.get_serializer().get_days_until(x))
        
        serializer = self.get_serializer(upcoming_records, many=True)
        return Response(serializer.data)
