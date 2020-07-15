from djongo import models

class Notice(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    view = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.title

class EffectKeyword(models.Model):
    exhaust = models.BooleanField(default=False)    # 소멸
    innate = models.BooleanField(default=False)     # 선천성
    ethereal = models.BooleanField(default=False)   # 휘발성
    unplayable = models.BooleanField(default=False) # 사용불가
    retain = models.BooleanField(default=False)     # 보존
    scry = models.BooleanField(default=False)       # 예지
    strength = models.BooleanField(default=False)   # 힘
    dexterity = models.BooleanField(default=False)  # 민첩
    block = models.BooleanField(default=False)      # 방어도
    vulnerable = models.BooleanField(default=False) # 취약
    weak = models.BooleanField(default=False)       # 약화
    artifact = models.BooleanField(default=False)   # 인공물
    intangible = models.BooleanField(default=False) # 불가침

    class Meta:
        abstract = True

# 추후 카드와 유물 간 상관관계에 대해 다룰 필요가 생길 수도 있어서 합침
class CardRelic(models.Model):
    eng_name = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    img = models.ImageField()
    effect = models.TextField()
    keyword = models.ArrayField(model_container=EffectKeyword, blank=True)
    card = models.BooleanField(default=False)
    rarity = models.CharField(max_length=20, blank=True)
    kind = models.CharField(max_length=20, blank=True)
    cost = models.PositiveSmallIntegerField()
    relic = models.BooleanField(default=False)
    flavor_text = models.TextField(blank=True)

class Potion(models.Model):
    eng_name = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    img = models.ImageField()
    effect = models.TextField()
    keyword = models.TextField()
    rarity = models.TextField(max_length=20)

class Opinion(models.Model):
    subject = models.CharField(max_length=50)
    writer = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    score = models.PositiveSmallIntegerField()
    pro = models.PositiveSmallIntegerField(default=0)
    con = models.PositiveSmallIntegerField(default=0)
    archetype = models.BooleanField(default=False)
    title = models.CharField(max_length=50)
    recommend_card = models.TextField()
    recommend_relic = models.TextField()
    