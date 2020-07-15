# Generated by Django 2.2.8 on 2020-07-09 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20200709_1310'),
    ]

    operations = [
        migrations.CreateModel(
            name='Potion',
            fields=[
                ('eng_name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('img', models.ImageField(upload_to='')),
                ('effect', models.TextField()),
                ('keyword', models.TextField()),
                ('rarity', models.TextField(max_length=20)),
            ],
        ),
        migrations.RemoveField(
            model_name='cardrelic',
            name='id',
        ),
        migrations.RemoveField(
            model_name='cardrelic',
            name='keyword',
        ),
        migrations.AlterField(
            model_name='cardrelic',
            name='eng_name',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]