from rest_framework import serializers
from .models import Notice, Opinion, CardRelic

import logging

logger = logging.getLogger(__name__)

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'created_at',
            'updated_at',
            'content',
            'view'
        )
        model = Notice

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'eng_name',
            'name',
            'subject',
            'img',
            'effect',
            'keyword',
            'card',
            'rarity',
            'kind',
            'cost',
            'score',
            'opinion_count'
        )
        model = CardRelic

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
            'key_card',
            'key_relic',
            'recommend_card',
            'recommend_relic',
            'card_character',
            'relic'
        )
        model = Opinion

class RelicSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'eng_name',
            'name',
            'subject',
            'img',
            'effect',
            'keyword',
            'rarity',
            'score',
            'opinion_count',
            'relic',
            'flavor_text'
        )
        model = CardRelic
