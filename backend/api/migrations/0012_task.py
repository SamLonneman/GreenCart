# Generated by Django 5.0.2 on 2024-04-16 21:42

import api.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_products_price'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=1000)),
                ('description', models.TextField(blank=True, null=True)),
                ('expected_time_commitment', models.IntegerField(default=30)),
                ('is_challenging', models.BooleanField(default=False)),
                ('is_community_oriented', models.BooleanField(default=False)),
                ('is_impactful', models.BooleanField(default=False)),
                ('is_learning_task', models.BooleanField(default=False)),
                ('due_date', models.DateTimeField(default=api.models.get_week_from_now)),
                ('is_accepted', models.BooleanField(default=False)),
                ('accepted_date', models.DateTimeField(blank=True, null=True)),
                ('is_completed', models.BooleanField(default=False)),
                ('completed_date', models.DateTimeField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]