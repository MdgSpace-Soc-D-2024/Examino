# Generated by Django 5.1.3 on 2025-01-30 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0004_alter_instituteclass_classes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instituteclass',
            name='classes',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='institutecourses',
            name='courses',
            field=models.CharField(max_length=50),
        ),
    ]
