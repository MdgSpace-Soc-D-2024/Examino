# Generated by Django 5.1.3 on 2025-01-12 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0003_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentcred',
            name='username',
            field=models.CharField(max_length=100),
        ),
    ]
