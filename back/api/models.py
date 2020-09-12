from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.contrib.auth.hashers import make_password

from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from djongo import models

class Notice(models.Model):
    objects = models.Manager()
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    view = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.title

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, name, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, password=password, **extra_fields)
        user.save(using=self._db)
        return user

    def create_user(self, email, name, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, name, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username=None
    email = models.EmailField(
        max_length=64,
        unique=True,
        help_text=_('EMAIL ID.'),
    )
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=400)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    # EMAIL_FIELD = 'email'

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

    # def get_short_name(self):
    #     return self.email

# 추후 카드와 유물 간 상관관계에 대해 다룰 필요가 생길 수도 있어서 합침
class CardRelic(models.Model):
    objects = models.Manager()
    eng_name = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    img = models.ImageField()
    effect = models.TextField()
    keyword = models.TextField()
    rarity = models.CharField(max_length=40, blank=True)
    score = models.PositiveSmallIntegerField(default=0)
    opinion_count = models.PositiveSmallIntegerField(default=0)
    card = models.BooleanField(default=False)
    kind = models.CharField(max_length=20, blank=True)
    cost = models.CharField(max_length=10, blank=True)
    relic = models.BooleanField(default=False)
    flavor_text = models.TextField(blank=True)

    def __str__(self):
        return self.eng_name

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['eng_name', 'subject', 'card'], name='unique_card')
        ]

class Potion(models.Model):
    objects = models.Manager()
    eng_name = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    img = models.ImageField()
    effect = models.TextField()
    keyword = models.TextField()
    rarity = models.TextField(max_length=20)

class Opinion(models.Model):
    objects = models.Manager()
    subject = models.CharField(max_length=50)
    writer = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    score = models.PositiveSmallIntegerField()
    pro = models.PositiveSmallIntegerField(default=0)
    con = models.PositiveSmallIntegerField(default=0)
    archetype = models.BooleanField(default=False)
    key_card = models.TextField()
    key_relic = models.TextField()
    recommend_card = models.TextField()
    recommend_relic = models.TextField()
    card_character = models.CharField(max_length=50)
    relic = models.BooleanField(default=False)
