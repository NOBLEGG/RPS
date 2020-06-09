from rest_framework import serializers
from .models import Notice

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'created_at',
            'updated_at',
            'content',
            'view',
        )
        model = Notice