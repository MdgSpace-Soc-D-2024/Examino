# Generated by Django 5.1.3 on 2025-01-19 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0006_studentanswers'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentanswers',
            name='courses',
            field=models.CharField(default=0, max_length=50),
            preserve_default=False,
        ),
    ]
