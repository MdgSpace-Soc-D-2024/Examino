# Generated by Django 5.1.3 on 2025-01-25 15:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('admin_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Exams',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classes', models.CharField(max_length=50)),
                ('courses', models.CharField(max_length=32)),
                ('date_scheduled', models.DateField()),
                ('questions', models.TextField()),
                ('institute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin_app.admin')),
            ],
        ),
        migrations.CreateModel(
            name='TeacherCred',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('courses', models.CharField(max_length=32)),
                ('password', models.CharField(max_length=100)),
                ('institute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='admin_app.admin')),
            ],
        ),
    ]
