from rest_framework import serializers
from .models import Notice, User, Opinion, CardRelic

from .tokens import account_activation_token

from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site

from django.core.mail import EmailMessage

import logging

logger = logging.getLogger(__name__)

# Return the currently active user model
User = get_user_model()

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

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'email',
            'username',
            'password'
        )
        model = User


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
