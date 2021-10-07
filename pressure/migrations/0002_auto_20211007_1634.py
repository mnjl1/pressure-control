# Generated by Django 3.2.8 on 2021-10-07 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pressure', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bloodpressure',
            options={'ordering': ('-created',)},
        ),
        migrations.RenameField(
            model_name='bloodpressure',
            old_name='updated',
            new_name='last_modified',
        ),
        migrations.AddField(
            model_name='bloodpressure',
            name='diastolic_pressure',
            field=models.IntegerField(default=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bloodpressure',
            name='heart_rate',
            field=models.IntegerField(default=80),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bloodpressure',
            name='systolic_pressure',
            field=models.IntegerField(default=80),
            preserve_default=False,
        ),
    ]
