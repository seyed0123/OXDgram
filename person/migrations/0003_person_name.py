# Generated by Django 4.1 on 2023-08-16 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("person", "0002_alter_person_password_alter_person_username"),
    ]

    operations = [
        migrations.AddField(
            model_name="person",
            name="name",
            field=models.CharField(default="", max_length=20),
        ),
    ]
