# Generated by Django 5.0.2 on 2024-03-02 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='image_link',
            field=models.CharField(max_length=10000),
        ),
    ]