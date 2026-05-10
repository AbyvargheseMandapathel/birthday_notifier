from rest_framework import viewsets, permissions
from .models import Voucher
from .serializers import VoucherSerializer

class VoucherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Voucher.objects.filter(is_active=True)
    serializer_class = VoucherSerializer
    permission_classes = [permissions.IsAuthenticated]
