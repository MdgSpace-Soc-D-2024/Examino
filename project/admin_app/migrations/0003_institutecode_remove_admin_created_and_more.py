# Generated by Django 5.1.3 on 2025-01-05 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InstituteCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institute', models.CharField(max_length=255, unique=True)),
                ('code', models.CharField(blank=True, max_length=10, unique=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='admin',
            name='created',
        ),
        migrations.RemoveField(
            model_name='admin',
            name='username',
        ),
        migrations.AddField(
            model_name='admin',
            name='address',
            field=models.TextField(default=9999999999),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='admin',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='admin',
            name='phone',
            field=models.IntegerField(default=9999999999, max_length=10),
        ),
    ]
