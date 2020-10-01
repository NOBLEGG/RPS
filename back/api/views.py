from django.conf import settings
from django.core.mail import EmailMessage
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.hashers import make_password, check_password
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text

from rest_framework import generics, serializers, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.views import JSONWebTokenAPIView
from rest_framework_jwt.serializers import JSONWebTokenSerializer, VerifyJSONWebTokenSerializer

from .tokens import account_activation_token
from .models import Notice, User, Opinion, CardRelic
from .serializers import NoticeSerializer, OpinionSerializer, CardSerializer, RelicSerializer
from .email import active_message, reset_message

# from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from rest_auth.registration.views import SocialLoginView

from datetime import datetime

import json, logging

User = get_user_model()

# jwt_response_payload_handler = settings.JWT_RESPONSE_PAYLOAD_HANDLER

logger = logging.getLogger(__name__)

# class FacebookLoginView(SocialLoginView):
#     adapter_class = FacebookOAuth2Adapter
#
# class GoogleLoginView(SocialLoginView):
#     adapter_class = GoogleOAuth2Adapter

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

class CreateUserView(APIView):
    def post(self, request):
        data = json.loads(request.body)

        try:
            validate_email(data['email'])

            if User.objects.filter(email=data['email']).exists():
                return JsonResponse({'message': 'EMAIL_EXISTS'}, status=400)

            if User.objects.filter(name=data['username']).exists():
                return JsonResponse({'message': 'USERNAME_EXISTS'}, status=400)

            if len(data['password']) < 8:
                return JsonResponse({'message': 'TOO_SHORT_PASSWORD'}, status=400)

            hashed_password = make_password(data['password'])

            user = User.objects.create(
                email = data['email'],
                name = data['username'],
                password = hashed_password,
                is_active = False
            )

            # current_site = get_current_site(request)
            domain       = 'rpspire.gg:8000'
            uidb64       = urlsafe_base64_encode(force_bytes(user.pk))
            token        = account_activation_token.make_token(user)
            message_data = active_message(domain, uidb64, token)

            email_title = "이메일을 인증해 주세요"
            to_email = data['email']
            email = EmailMessage(email_title, message_data, to=[to_email])
            email.send(fail_silently=True)

            return JsonResponse({'message': 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'message': 'INVALID_KEY'}, status=400)
        except TypeError:
            return JsonResponse({'message': 'INVALID_TYPE'}, status=400)
        except ValidationError:
            return JsonResponse({'message': 'VALIDATION_ERROR'}, status=400)

class UserActiveView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect("https://rpspire.gg/login")
        else:
            return HttpResponse(status=400)

class JWTView(JSONWebTokenAPIView):
    def post(self, request, obj, *args, **kwargs):
        if obj == 'obtain':
            serializer = JSONWebTokenSerializer(data=request.data)
        elif obj == 'verify':
            serializer = VerifyJSONWebTokenSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user')
            name = User.objects.get(email=user).name
            token = serializer.object.get('token')
            response = Response(token)
            if settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() +
                              settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration)
                response.set_cookie('email', user, expires=expiration)
                response.set_cookie('name', name, expires=expiration)
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePWView(APIView):
    def put(self, request, *args, **kwargs):
        data = json.loads(request.body)

        try:
            validate_email(data['email'])

            if not User.objects.filter(email=data['email']).exists():
                return JsonResponse({'message': 'EMAIL_NOT_EXISTS'}, status=400)

            user = User.objects.get(email=data['email'])

            if not check_password(data['current'], user.password):
                return JsonResponse({'message': 'CURRENT_CHECK_FAILED'}, status=400)

            if (data['password'] != data['check']):
                return JsonResponse({'message': 'CHECK_FAILED'}, status=400)

            if len(data['password']) < 8:
                return JsonResponse({'message': 'TOO_SHORT_PASSWORD'}, status=400)

            user.set_password(data['password'])
            user.save()

            return JsonResponse({'message': 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'message': 'INVALID_KEY'}, status=400)
        except TypeError:
            return JsonResponse({'message': 'INVALID_TYPE'}, status=400)
        except ValidationError:
            return JsonResponse({'message': 'VALIDATION_ERROR'}, status=400)

class ResetView(APIView):
    def post(self, request):
        data = json.loads(request.body)

        try:
            validate_email(data['email'])

            if not User.objects.filter(email=data['email']).exists():
                return JsonResponse({'message': 'EMAIL_NOT_EXISTS'}, status=400)

            user = User.objects.get(email=data['email'])

            domain       = 'rpspire.gg'
            uidb64       = urlsafe_base64_encode(force_bytes(user.email))
            token        = account_activation_token.make_token(user)
            message_data = reset_message(domain, uidb64, token)

            email_title = "비밀번호 변경을 요청하셨습니다"
            to_email = data['email']
            email = EmailMessage(email_title, message_data, to=[to_email])
            email.send(fail_silently=True)

            return JsonResponse({'message': 'SUCCESS'}, status=200)

        except KeyError:
            return JsonResponse({'message': 'INVALID_KEY'}, status=400)
        except TypeError:
            return JsonResponse({'message': 'INVALID_TYPE'}, status=400)
        except ValidationError:
            return JsonResponse({'message': 'VALIDATION_ERROR'}, status=400)

class ResetConfirmView(APIView):
    def put(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(email=uid)
        except OverflowError:
            return JsonResponse({'message': 'OVERFLOW'}, status=400)
        except TypeError:
            return JsonResponse({'message': 'INVALID_TYPE'}, status=400)
        except ValueError:
            return JsonResponse({'message': 'INVALID_VALUE'}, status=400)
        except User.DoesNotExist:
            return JsonResponse({'message': 'USER_NOT_EXISTS'}, status=400)

        if account_activation_token.check_token(user, token):
            data = json.loads(request.body)
            try:
                if (data['password'] != data['check']):
                    return JsonResponse({'message': 'CHECK_FAILED'}, status=400)
                if len(data['password']) < 8:
                    return JsonResponse({'message': 'TOO_SHORT_PASSWORD'}, status=400)

                user.set_password(data['password'])
                user.save()
                logger.warn("SAVED")
                return JsonResponse({'message': 'SUCCESS'}, status=200)

            except KeyError:
                return JsonResponse({'message': 'INVALID_KEY'}, status=400)
            except TypeError:
                return JsonResponse({'message': 'INVALID_TYPE'}, status=400)
            except ValidationError:
                return JsonResponse({'message': 'VALIDATION_ERROR'}, status=400)
        else:
            return HttpResponse(status=400)

class DeleteUserView(APIView):
    def post(self, request):
        data = json.loads(request.body)

        if not User.objects.filter(email=data['email']).exists():
            return JsonResponse({'message': 'EMAIL_NOT_EXISTS'}, status=400)

        user = User.objects.get(email=data['email'])

        if not check_password(data['pw'], user.password):
            return JsonResponse({'message': 'PW_NOT_CORRECT'}, status=400)
        user.delete()

        return JsonResponse({'message': 'SUCCESS'}, status=200)

class CharacterView(APIView):
    def get(self, request, obj):
        params = request.GET.get('filter', '')

        if params == '':
            opinion = Opinion.objects.all().filter(subject=obj).filter(archetype=False).order_by('-pro', '-con')[0:3]
            opinion_serializer = OpinionSerializer(opinion, many=True)

            card = CardRelic.objects.all().filter(card=True).filter(subject=obj)
            card_serializer = CardSerializer(card, many=True)
            archetype = Opinion.objects.all().filter(subject=obj).filter(archetype=True).order_by('-pro', '-con')[0:3]
            archetype_serializer = OpinionSerializer(archetype, many=True)

            return Response([opinion_serializer.data, card_serializer.data, archetype_serializer.data])
        else:
            json_data = json.loads(params)

            card = CardRelic.objects.all().filter(card=True).filter(subject=obj)

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
            if (json_data['channel'] == 1):
                card = card.filter(keyword__contains='"channel":1')
            if (json_data['dark'] == 1):
                card = card.filter(keyword__contains='"dark":1')
            if (json_data['dexterity'] == 1):
                card = card.filter(keyword__contains='"dexterity":1')
            if (json_data['ethereal'] == 1):
                card = card.filter(keyword__contains='"ethereal":1')
            if (json_data['evoke'] == 1):
                card = card.filter(keyword__contains='"evoke":1')
            if (json_data['exhaust'] == 1):
                card = card.filter(keyword__contains='"exhaust":1')
            if (json_data['focus'] == 1):
                card = card.filter(keyword__contains='"focus":1')
            if (json_data['frost'] == 1):
                card = card.filter(keyword__contains='"frost":1')
            if (json_data['innate'] == 1):
                card = card.filter(keyword__contains='"innate":1')
            if (json_data['intangible'] == 1):
                card = card.filter(keyword__contains='"intangible":1')
            if (json_data['lightning'] == 1):
                card = card.filter(keyword__contains='"lightning":1')
            if (json_data['lockon'] == 1):
                card = card.filter(keyword__contains='"lockon":1')
            if (json_data['plasma'] == 1):
                card = card.filter(keyword__contains='"plasma":1')
            if (json_data['poison'] == 1):
                card = card.filter(keyword__contains='"poison":1')
            if (json_data['retain'] == 1):
                card = card.filter(keyword__contains='"retain":1')
            if (json_data['scry'] == 1):
                card = card.filter(keyword__contains='"scry":1')
            if (json_data['shiv'] == 1):
                card = card.filter(keyword__contains='"shiv":1')
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

            card_serializer = CardSerializer(card, many=True)

            return Response(card_serializer.data)

class CharacterProConView(APIView):
    def post(self, request, character, pk, email, obj):
        target = Opinion.objects.get(id=pk)

        if obj == 'pro':
            if (len(target.pro_record) == 0):
                target.pro_record += email + '=1'
                target.pro += 1
            else:
                if (target.pro_record.find(email) == -1):
                    target.pro_record += ', ' + email + '=1'
                    target.pro += 1
                else:
                    return HttpResponse(status=403)
        else:
            if (len(target.con_record) == 0):
                target.con_record += email + '=1'
                target.con += 1
            else:
                if (target.con_record.find(email) == -1):
                    target.con_record += ', ' + email + '=1'
                    target.con += 1
                else:
                    return HttpResponse(status=403)
        target.save()
        return redirect('/character/' + character + '/')

class CharacterOpinionView(APIView):
    def get(self, request, character):
        queryset = Opinion.objects.all().filter(subject=character).filter(archetype=False)
        serializer = OpinionSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, character):
        opinion = Opinion()
        opinion.subject = character
        opinion.writer = request.data.get('writer')
        opinion.content = request.data.get('content')
        opinion.score = request.data.get('score')

        queryset = Opinion.objects.all().filter(subject=character).filter(archetype=False)
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
        params = request.GET.get('filter', '')

        if params == '':
            card = CardRelic.objects.all().filter(card=True)
            card_serializer = CardSerializer(card, many=True)

            return Response(card_serializer.data)
        else:
            json_data = json.loads(params)

            card = CardRelic.objects.all().filter(card=True)

            if (json_data['ironclad'] == 1):
                card = card.filter(subject__contains='ironclad')
            elif (json_data['silent'] == 1):
                card = card.filter(subject__contains='silent')
            elif (json_data['defect'] == 1):
                card = card.filter(subject__contains='defect')

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
            if (json_data['channel'] == 1):
                card = card.filter(keyword__contains='"channel":1')
            if (json_data['dark'] == 1):
                card = card.filter(keyword__contains='"dark":1')
            if (json_data['dexterity'] == 1):
                card = card.filter(keyword__contains='"dexterity":1')
            if (json_data['ethereal'] == 1):
                card = card.filter(keyword__contains='"ethereal":1')
            if (json_data['evoke'] == 1):
                card = card.filter(keyword__contains='"evoke":1')
            if (json_data['exhaust'] == 1):
                card = card.filter(keyword__contains='"exhaust":1')
            if (json_data['focus'] == 1):
                card = card.filter(keyword__contains='"focus":1')
            if (json_data['frost'] == 1):
                card = card.filter(keyword__contains='"frost":1')
            if (json_data['innate'] == 1):
                card = card.filter(keyword__contains='"innate":1')
            if (json_data['intangible'] == 1):
                card = card.filter(keyword__contains='"intangible":1')
            if (json_data['lightning'] == 1):
                card = card.filter(keyword__contains='"lightning":1')
            if (json_data['lockon'] == 1):
                card = card.filter(keyword__contains='"lockon":1')
            if (json_data['plasma'] == 1):
                card = card.filter(keyword__contains='"plasma":1')
            if (json_data['poison'] == 1):
                card = card.filter(keyword__contains='"poison":1')
            if (json_data['retain'] == 1):
                card = card.filter(keyword__contains='"retain":1')
            if (json_data['scry'] == 1):
                card = card.filter(keyword__contains='"scry":1')
            if (json_data['shiv'] == 1):
                card = card.filter(keyword__contains='"shiv":1')
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

            card_serializer = CardSerializer(card, many=True)

            return Response(card_serializer.data)

class CardDetailView(APIView):
    def get(self, request, character, card):
        card = CardRelic.objects.all().filter(subject=character).get(eng_name=card)
        card_serializer = CardSerializer(card)

        opinion = Opinion.objects.all().filter(card_character=character).filter(subject=card).order_by('-pro', '-con')[0:3]
        opinion_serializer = OpinionSerializer(opinion, many=True)

        return Response([card_serializer.data, opinion_serializer.data])

class CardProConView(APIView):
    def post(self, request, character, card, pk, email, obj):
        target = Opinion.objects.get(id=pk)

        if obj == 'pro':
            if (len(target.pro_record) == 0):
                target.pro_record += email + '=1'
                target.pro += 1
            else:
                if (target.pro_record.find(email) == -1):
                    target.pro_record += ', ' + email + '=1'
                    target.pro += 1
                else:
                    return HttpResponse(status=403)
        else:
            if (len(target.con_record) == 0):
                target.con_record += email + '=1'
                target.con += 1
            else:
                if (target.con_record.find(email) == -1):
                    target.con_record += ', ' + email + '=1'
                    target.con += 1
                else:
                    return HttpResponse(status=403)
        target.save()
        return redirect('/card/' + character + '/' + card + '/')

class CardOpinionView(APIView):
    def get(self, request, character, card):
        queryset = Opinion.objects.all().filter(card_character=character).filter(subject=card)
        serializer = OpinionSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, character, card):
        opinion = Opinion()
        opinion.subject = card
        opinion.writer = request.data.get('writer')
        opinion.content = request.data.get('content')
        opinion.score = request.data.get('score')
        opinion.card_character = request.data.get('card_character')

        target = CardRelic.objects.get(eng_name=card, subject=character)
        target.score += opinion.score
        target.opinion_count += 1

        queryset = Opinion.objects.all().filter(card_character=character).filter(subject=card)
        serializer = OpinionSerializer(queryset, many=True)

        try:
            opinion.save()
            target.save()
            return Response(serializer.data)
        except:
            return HttpResponse(status=404)

class RelicView(APIView):
    def get(self, request):
        params = request.GET.get('filter', '')

        if params == '':
            relic = CardRelic.objects.all().filter(relic=True)
            relic_serializer = RelicSerializer(relic, many=True)

            return Response(relic_serializer.data)
        else:
            json_data = json.loads(params)

            relic = CardRelic.objects.all().filter(relic=True)

            if (json_data['ironclad'] == 1):
                relic = relic.filter(rarity__contains='Ironclad')
            elif (json_data['silent'] == 1):
                relic = relic.filter(rarity__contains='Silent')
            elif (json_data['defect'] == 1):
                relic = relic.filter(rarity__contains='Defect')

            if (json_data['starter'] == 1):
                relic = relic.filter(rarity__contains='Starter')
            elif (json_data['common'] == 1):
                relic = relic.filter(rarity__contains='Common')
            elif (json_data['uncommon'] == 1):
                relic = relic.filter(rarity__contains='Uncommon')
            elif (json_data['rare'] == 1):
                relic = relic.filter(rarity__contains='Rare')
            elif (json_data['boss'] == 1):
                relic = relic.filter(rarity__contains='Boss')

            if (json_data['artifact'] == 1):
                relic = relic.filter(keyword__contains='"artifact":1')
            if (json_data['block'] == 1):
                relic = relic.filter(keyword__contains='"block":1')
            if (json_data['channel'] == 1):
                card = card.filter(keyword__contains='"channel":1')
            if (json_data['dark'] == 1):
                card = card.filter(keyword__contains='"dark":1')
            if (json_data['dexterity'] == 1):
                relic = relic.filter(keyword__contains='"dexterity":1')
            if (json_data['ethereal'] == 1):
                relic = relic.filter(keyword__contains='"ethereal":1')
            if (json_data['exhaust'] == 1):
                relic = relic.filter(keyword__contains='"exhaust":1')
            if (json_data['frost'] == 1):
                card = card.filter(keyword__contains='"frost":1')
            if (json_data['innate'] == 1):
                relic = relic.filter(keyword__contains='"innate":1')
            if (json_data['intangible'] == 1):
                relic = relic.filter(keyword__contains='"intangible":1')
            if (json_data['lightning'] == 1):
                card = card.filter(keyword__contains='"lightning":1')
            if (json_data['poison'] == 1):
                relic = relic.filter(keyword__contains='"poison":1')
            if (json_data['retain'] == 1):
                relic = relic.filter(keyword__contains='"retain":1')
            if (json_data['scry'] == 1):
                relic = relic.filter(keyword__contains='"scry":1')
            if (json_data['shiv'] == 1):
                card = card.filter(keyword__contains='"shiv":1')
            if (json_data['strength'] == 1):
                relic = relic.filter(keyword__contains='"strength":1')
            if (json_data['unplayable'] == 1):
                relic = relic.filter(keyword__contains='"unplayable":1')
            if (json_data['vulnerable'] == 1):
                relic = relic.filter(keyword__contains='"vulnerable":1')
            if (json_data['weak'] == 1):
                relic = relic.filter(keyword__contains='"weak":1')
            if (json_data['wound'] == 1):
                relic = relic.filter(keyword__contains='"wound":1')

            relic_serializer = RelicSerializer(relic, many=True)

            return Response(relic_serializer.data)

class RelicDetailView(APIView):
    def get(self, request, relic):
        relic = CardRelic.objects.filter(relic=True).get(eng_name=relic)
        relic_serializer = RelicSerializer(relic)

        opinion = Opinion.objects.all().filter(relic=True).filter(subject=relic).order_by('-pro', '-con')[0:3]
        opinion_serializer = OpinionSerializer(opinion, many=True)

        return Response([relic_serializer.data, opinion_serializer.data])

class RelicProConView(APIView):
    def post(self, request, relic, pk, email, obj):
        target = Opinion.objects.get(id=pk)

        if obj == 'pro':
            if (len(target.pro_record) == 0):
                target.pro_record += email + '=1'
                target.pro += 1
            else:
                if (target.pro_record.find(email) == -1):
                    target.pro_record += ', ' + email + '=1'
                    target.pro += 1
                else:
                    return HttpResponse(status=403)
        else:
            if (len(target.con_record) == 0):
                target.con_record += email + '=1'
                target.con += 1
            else:
                if (target.con_record.find(email) == -1):
                    target.con_record += ', ' + email + '=1'
                    target.con += 1
                else:
                    return HttpResponse(status=403)
        target.save()
        return redirect('/relic/' + relic + '/')

class RelicOpinionView(APIView):
    def get(self, request, relic):
        queryset = Opinion.objects.all().filter(subject=relic).filter(relic=True)
        serializer = OpinionSerializer(queryset, many=True)

        return Response(serializer.data)

    def post(self, request, relic):
        opinion = Opinion()
        opinion.subject = relic
        opinion.writer = request.data.get('writer')
        opinion.content = request.data.get('content')
        opinion.score = request.data.get('score')
        opinion.relic = request.data.get('relic')

        target = CardRelic.objects.get(eng_name=relic, relic=True)
        target.score += opinion.score
        target.opinion_count += 1

        queryset = Opinion.objects.all().filter(subject=relic).filter(relic=True)
        serializer = OpinionSerializer(queryset, many=True)

        try:
            opinion.save()
            target.save()
            return Response(serializer.data)
        except:
            return HttpResponse(status=404)

class OpinionProConView(APIView):
    def post(self, request, character, card, relic, pk, email, obj):
        target = Opinion.objects.get(id=pk)

        if obj == 'pro':
            if (len(target.pro_record) == 0):
                target.pro_record += email + '=1'
                target.pro += 1
            else:
                if (target.pro_record.find(email) == -1):
                    target.pro_record += ', ' + email + '=1'
                    target.pro += 1
                else:
                    return HttpResponse(status=403)
        else:
            if (len(target.con_record) == 0):
                target.con_record += email + '=1'
                target.con += 1
            else:
                if (target.con_record.find(email) == -1):
                    target.con_record += ', ' + email + '=1'
                    target.con += 1
                else:
                    return HttpResponse(status=403)
        target.save()

        if (relic == "undefined"):
            if (card == "undefined"):
                return redirect('/opinion/character/' + character + '/')
            else:
                return redirect('/opinion/card/' + character + '/' + card + '/')
        else:
            return redirect('/opinion/relic/' + relic + '/')
