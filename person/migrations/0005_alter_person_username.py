# Generated by Django 4.1 on 2023-08-19 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("person", "0004_person_banner_img"),
    ]

    operations = [
        migrations.AlterField(
            model_name="person",
            name="username",
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
