# Generated by Django 5.0.2 on 2024-03-02 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_persontest_age'),
    ]

    operations = [
        migrations.AddField(
            model_name='persontest',
            name='age',
            field=models.IntegerField(default=0),
        ),
    ]
