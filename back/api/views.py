from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Notice, Opinion, CardRelic
from .serializers import NoticeSerializer, OpinionSerializer, CardSerializer

import logging

logger = logging.getLogger(__name__)

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
        opinion = Opinion.objects.all().filter(subject=obj).filter(archetype=False).order_by('-pro', '-con')[0:3]
        opinion_serializer = OpinionSerializer(opinion, many=True)
        
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

        card = CardRelic.objects.all().filter(subject=obj)

        if len(params_to_list) > 0:
            for i in params_to_list:
                card = card.filter(keyword__contains=i)

        card_serializer = CardSerializer(card, many=True)

        archetype = Opinion.objects.all().filter(subject=obj).filter(archetype=True).order_by('-pro', '-con')[0:3]
        archetype_serializer = OpinionSerializer(archetype, many=True)

        return Response([opinion_serializer.data, card_serializer.data, archetype_serializer.data])

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

        queryset = Opinion.objects.all().filter(subject=obj).filter(archetype=True)
        serializer = OpinionSerializer(queryset, many=True)

        try:
            opinion.save()
            return Response(serializer.data)
        except:
            return HttpResponse(status=404)

class CardView(APIView):
    def get(self, request):
        logger.warn("CardView")
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