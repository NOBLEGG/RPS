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
