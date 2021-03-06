# Generated by Django 2.2 on 2020-11-11 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0007_bigcategory_is_show'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['name'], 'verbose_name': '文章分类', 'verbose_name_plural': '文章分类'},
        ),
        migrations.AddField(
            model_name='article',
            name='comments',
            field=models.IntegerField(default=0, verbose_name='评论数'),
        ),
        migrations.AlterField(
            model_name='article',
            name='views',
            field=models.IntegerField(default=0, verbose_name='浏览量'),
        ),
    ]
