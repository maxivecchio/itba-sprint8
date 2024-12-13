# Generated by Django 4.2.15 on 2024-12-13 21:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MarcaTarjeta',
            fields=[
                ('id_marca', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Marca de Tarjeta',
                'verbose_name_plural': 'Marcas de Tarjetas',
                'db_table': 'MarcaTarjeta',
            },
        ),
        migrations.CreateModel(
            name='Tarjeta',
            fields=[
                ('id_tarjeta', models.AutoField(primary_key=True, serialize=False)),
                ('numero', models.CharField(max_length=20)),
                ('cvv', models.IntegerField()),
                ('fecha_otorgamiento', models.DateField(blank=True, null=True)),
                ('fecha_expiracion', models.DateField(blank=True, null=True)),
                ('tipo', models.CharField(blank=True, max_length=25, null=True)),
                ('cliente', models.ForeignKey(db_column='fk_tarjeta_cliente_id', on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente')),
                ('marca', models.ForeignKey(db_column='fk_tarjeta_marca_id', on_delete=django.db.models.deletion.CASCADE, to='tarjetas.marcatarjeta')),
            ],
            options={
                'verbose_name': 'Tarjeta',
                'verbose_name_plural': 'Tarjetas',
                'db_table': 'Tarjeta',
            },
        ),
    ]
