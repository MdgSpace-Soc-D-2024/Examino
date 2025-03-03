# Generated by Django 5.1.3 on 2025-02-01 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institute', models.CharField(max_length=200)),
                ('address', models.TextField()),
                ('email', models.EmailField(max_length=254, null=True)),
                ('phone', models.IntegerField(default=9999999999, max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='InstituteClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('classes', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='InstituteCourses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courses', models.CharField(max_length=50)),
            ],
        ),
    ]
