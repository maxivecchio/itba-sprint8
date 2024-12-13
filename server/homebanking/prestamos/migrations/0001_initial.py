# Generated by Django 4.2.15 on 2024-12-13 20:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prestamo',
            fields=[
                ('id_prestamo', models.AutoField(primary_key=True, serialize=False)),
                ('metodo_pago', models.CharField(max_length=50)),
                ('fecha_prestamo', models.DateField()),
                ('monto_total', models.IntegerField()),
                ('cliente', models.ForeignKey(db_column='fk_prestamo_cliente_id', on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente')),
            ],
            options={
                'verbose_name': 'Préstamo',
                'verbose_name_plural': 'Préstamos',
                'db_table': 'Prestamo',
            },
        ),
    ]
