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
            name='TipoCuenta',
            fields=[
                ('id_tipo_cuenta', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_tipo_cuenta', models.CharField(max_length=50)),
                ('moneda', models.CharField(max_length=10)),
            ],
            options={
                'verbose_name': 'Tipo de Cuenta',
                'verbose_name_plural': 'Tipos de Cuenta',
                'db_table': 'TipoCuenta',
            },
        ),
        migrations.CreateModel(
            name='CuentaCliente',
            fields=[
                ('id_cuenta_cliente', models.AutoField(primary_key=True, serialize=False)),
                ('saldo', models.IntegerField()),
                ('cliente', models.ForeignKey(db_column='fk_cuenta_cliente_id', on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente')),
                ('tipo_cuenta', models.ForeignKey(db_column='fk_tipo_cuenta_id', on_delete=django.db.models.deletion.CASCADE, to='cuentas.tipocuenta')),
            ],
            options={
                'verbose_name': 'Cuenta del Cliente',
                'verbose_name_plural': 'Cuentas de Clientes',
                'db_table': 'CuentaCliente',
            },
        ),
    ]
