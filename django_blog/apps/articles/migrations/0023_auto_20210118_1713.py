# Generated by Django 2.2 on 2021-01-18 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0022_auto_20210116_1527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentuser',
            name='nickname',
            field=models.CharField(default='匿名用户', max_length=20, verbose_name='昵称'),
        ),
    ]
