from djongo import models

class Notice(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    view = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.title

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

class CardRelic(models.Model):
    name = models.CharField(max_length=50)
    eng_name = models.CharField(max_length=50)
    opinion = models.ArrayField(model_container=Opinion)
    img = models.ImageField()
    effect = models.TextField()
    keyword = models.TextField()
    card = models.BooleanField(default=False)
    rarity = models.TextField(max_length=20)
    kind = models.TextField(max_length=20)
    cost = models.PositiveSmallIntegerField()
    relic = models.BooleanField(default=False)
    flavor_text = models.TextField()