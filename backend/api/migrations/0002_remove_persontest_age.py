# Generated by Django 5.0.2 on 2024-03-02 21:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='persontest',
            name='age',
        ),
    ]
