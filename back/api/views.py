from django.shortcuts import render, redirect
from django.http import HttpResponse

from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Notice, Opinion, CardRelic
from .serializers import NoticeSerializer, OpinionSerializer, CardSerializer

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

import json, logging

logger = logging.getLogger(__name__)

class FacebookLoginView(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class NoticeListView(generics.ListAPIView):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

class NoticeDetailView(generics.RetrieveAPIView):
    serializer_class = NoticeSerializer

    def get_queryset(self):
        add_view = Notice.objects.get(id=self.kwargs['pk'])
        add_view.view += 1
        add_view.save()

        return Notice.objects.filter(id=self.kwargs['pk'])

class CharacterView(APIView):
    def get(self, request, obj):
        params = request.GET.get('filter', '')

        if params == '':
            opinion = Opinion.objects.all().filter(subject=obj).filter(archetype=False).order_by('-pro', '-con')[0:3]
            opinion_serializer = OpinionSerializer(opinion, many=True)

            card = CardRelic.objects.all().filter(subject=obj)
            card_serializer = CardSerializer(card, many=True)

            archetype = Opinion.objects.all().filter(subject=obj).filter(archetype=True).order_by('-pro', '-con')[0:3]
            archetype_serializer = OpinionSerializer(archetype, many=True)

            return Response([opinion_serializer.data, card_serializer.data, archetype_serializer.data])
        else:
            json_data = json.loads(params)

            card = CardRelic.objects.all().filter(subject=obj)

            if (json_data['common'] == 1):
                card = card.filter(rarity__contains='Common')
            elif (json_data['uncommon'] == 1):
                card = card.filter(rarity__contains='Uncommon')
            elif (json_data['rare'] == 1):
                card = card.filter(rarity__contains='Rare')

            if (json_data['attack'] == 1):
                card = card.filter(kind__contains='Attack')
            elif (json_data['skill'] == 1):
                card = card.filter(kind__contains='Skill')
            elif (json_data['power'] == 1):
                card = card.filter(kind__contains='Power')

            if (json_data['X'] == 1):
                card = card.filter(cost__startswith='X')
            elif (json_data['0'] == 1):
                card = card.filter(cost__startswith=0)
            elif (json_data['1'] == 1):
                card = card.filter(cost__startswith=1)
            elif (json_data['2'] == 1):
                card = card.filter(cost__startswith=2)
            elif (json_data['3'] == 1):
                card = card.filter(cost__startswith=3)
            elif (json_data['4'] == 1):
                card = card.filter(cost__startswith=4)
            elif (json_data['5'] == 1):
                card = card.filter(cost__startswith=5)

            if (json_data['artifact'] == 1):
                card = card.filter(keyword__contains='"artifact":1')
            if (json_data['block'] == 1):
                card = card.filter(keyword__contains='"block":1')
            if (json_data['dexterity'] == 1):
                card = card.filter(keyword__contains='"dexterity":1')
            if (json_data['ethereal'] == 1):
                card = card.filter(keyword__contains='"ethereal":1')
            if (json_data['exhaust'] == 1):
                card = card.filter(keyword__contains='"exhaust":1')
            if (json_data['innate'] == 1):
                card = card.filter(keyword__contains='"innate":1')
            if (json_data['intangible'] == 1):
                card = card.filter(keyword__contains='"intangible":1')
            if (json_data['retain'] == 1):
                card = card.filter(keyword__contains='"retain":1')
            if (json_data['scry'] == 1):
                card = card.filter(keyword__contains='"scry":1')
            if (json_data['strength'] == 1):
                card = card.filter(keyword__contains='"strength":1')
            if (json_data['unplayable'] == 1):
                card = card.filter(keyword__contains='"unplayable":1')
            if (json_data['vulnerable'] == 1):
                card = card.filter(keyword__contains='"vulnerable":1')
            if (json_data['weak'] == 1):
                card = card.filter(keyword__contains='"weak":1')
            if (json_data['wound'] == 1):
                card = card.filter(keyword__contains='"wound":1')

            logger.warn(card)

            card_serializer = CardSerializer(card, many=True)

            return Response(card_serializer.data)

    def post(self, request, obj1, pk, obj2):
        target = Opinion.objects.get(id=pk)

        if obj2 == 'pro':
            target.pro += 1
        else:
            target.con += 1
        target.save()

        return redirect('/character/' + obj1 + '/')

class OpinionView(APIView):
    def get(self, request, obj):
        queryset = Opinion.objects.all().filter(subject=obj).filter(archetype=False)
        serializer = OpinionSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, obj):
        opinion = Opinion()
        opinion.subject = obj
        opinion.writer = request.data.get('writer')
        opinion.content = request.data.get('content')
        opinion.score = request.data.get('score')

        queryset = Opinion.objects.all().filter(subject=obj).filter(archetype=False)
        serializer = OpinionSerializer(queryset, many=True)

        try:
            opinion.save()
            return Response(serializer.data)
        except:
            return HttpResponse(status=404)

class ArchetypeView(APIView):
    def get(self, request, obj):
        queryset = Opinion.objects.all().filter(subject=obj).filter(archetype=True)
        serializer = OpinionSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, obj):
        opinion = Opinion()
        opinion.subject = obj
        opinion.writer = request.data.get('writer')
        opinion.content = request.data.get('content')
        opinion.score = request.data.get('score')
        opinion.archetype = request.data.get('archetype')
        opinion.title = request.data.get('title')
        opinion.recommend_card = request.data.get('recommend_card')
        opinion.recommend_relic = request.data.get('recommend_relic')

        try:
            opinion.save()
            return redirect('/archetype/' + obj + '/')
        except:
            return HttpResponse(status=404)

class CardView(APIView):
    def get(self, request):
        params = request.GET.get('keyword', '')
        params_to_list = []

        str_temp = ""
        for i in range(len(params)):
            if (params[i] == '1'):
                str_temp += "1"
                params_to_list.append(str_temp)
                str_temp = ""
            elif (params[i] == ','):
                str_temp = ""
            elif (params[i] == '}'):
                str_temp = ""
            else:
                str_temp += params[i]

        card = CardRelic.objects.all()

        if len(params_to_list) > 0:
            for i in params_to_list:
                card = card.filter(keyword__contains=i)

        card_serializer = CardSerializer(card, many=True)

        return Response(card_serializer.data)

class CardDetailView(APIView):
    def get(self, request, obj):
        logger.warn(obj)
        card = CardRelic.objects.get(eng_name=obj)
        card_serializer = CardSerializer(card)

        opinion = Opinion.objects.all().filter(subject=obj).order_by('-pro', '-con')[0:3]
        opinion_serializer = OpinionSerializer(opinion, many=True)

        return Response([card_serializer.data, opinion_serializer.data])
