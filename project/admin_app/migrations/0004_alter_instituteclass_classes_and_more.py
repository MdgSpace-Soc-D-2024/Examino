# Generated by Django 5.1.3 on 2025-01-29 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0003_alter_admin_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instituteclass',
            name='classes',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='institutecourses',
            name='courses',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
