from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect

from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Notice, Opinion
from .forms import OpinionForm
from .serializers import NoticeSerializer, OpinionSerializer

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

class OpinionView(APIView):
    def get(self, request, obj):
        queryset = Opinion.objects.all().filter(subject=obj)
        serializer = OpinionSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, obj):
        opinion = Opinion()
        opinion.subject = obj
        opinion.writer = request.data.get('writer')
        opinion.content = request.data.get('content')
        opinion.score = request.data.get('score')

        queryset = Opinion.objects.all().filter(subject=obj)
        serializer = OpinionSerializer(queryset, many=True)

        try:
            opinion.save()
            return Response(serializer.data)
        except:
            return HttpResponse(status=404)