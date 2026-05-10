from django.db import models
import uuid

class Voucher(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, default='Shopping')
    discount_text = models.CharField(max_length=50, blank=True, null=True)
    brand_color = models.CharField(max_length=7, default='#6366f1') # Hex color
    link = models.URLField()
    description = models.TextField(blank=True, null=True)
    icon_type = models.CharField(max_length=50, default='ShoppingBag') # Lucide icon name
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']
