# Generated by Django 5.1.3 on 2025-01-11 12:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0009_instituteclass_institute'),
    ]

    operations = [
        migrations.AddField(
            model_name='institutecourses',
            name='institute',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='admin_app.admin'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='InstituteCode',
        ),
    ]
