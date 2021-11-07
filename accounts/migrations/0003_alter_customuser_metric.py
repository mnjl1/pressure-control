# Generated by Django 3.2.8 on 2021-11-07 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_customuser_metric'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='metric',
            field=models.CharField(choices=[('metric', 'Celsius'), ('imperial', 'Fahrenheit')], default='metric', max_length=10),
        ),
    ]
