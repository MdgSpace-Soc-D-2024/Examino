# Generated by Django 5.1.3 on 2025-01-05 05:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0003_institutecode_remove_admin_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='institutecode',
            name='institute',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin_app.admin'),
        ),
    ]
