from rest_framework import serializers
from .models import Notice, Opinion

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

class OpinionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'subject',
            'writer',
            'created_at',
            'content',
            'score',
            'pro',
            'con',
            'archetype',
            'title',
            'recommend_card',
            'recommend_relic'
        )
        model = Opinion