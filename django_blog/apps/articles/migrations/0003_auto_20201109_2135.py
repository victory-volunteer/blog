# Generated by Django 2.2 on 2020-11-09 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_auto_20201109_2046'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='friendlink',
            name='description',
        ),
        migrations.AlterField(
            model_name='friendlink',
            name='is_show',
            field=models.BooleanField(default=False, verbose_name='是否展示'),
        ),
        migrations.AlterField(
            model_name='friendlink',
            name='link',
            field=models.URLField(verbose_name='友链地址'),
        ),
        migrations.AlterField(
            model_name='friendlink',
            name='logo',
            field=models.ImageField(blank=True, default='upimage/default1.png', null=True, upload_to='logo/%Y/%m', verbose_name='图片地址'),
        ),
        migrations.AlterField(
            model_name='rotation',
            name='title',
            field=models.CharField(blank=True, default='仅供欣赏', max_length=20, null=True, verbose_name='标题'),
        ),
    ]
