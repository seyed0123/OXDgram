# Generated by Django 4.1 on 2023-08-20 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("post", "0004_rename_username_post_owner"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="owner",
            field=models.CharField(default="0", max_length=15),
        ),
    ]
