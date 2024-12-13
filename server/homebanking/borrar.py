import os
import shutil
import subprocess

def delete_db_and_specific_folders(base_path):
    """
    Borra el archivo de base de datos y carpetas específicas.
    """
    # Eliminar la base de datos
    db_path = os.path.join(base_path, 'db.sqlite3')
    if os.path.exists(db_path):
        print(f"Deleting database file: {db_path}")
        os.remove(db_path)

    # Eliminar carpetas específicas
    for root, dirs, files in os.walk(base_path):
        for folder in ['migrations', '__pycache__']:
            folder_path = os.path.join(root, folder)
            if os.path.exists(folder_path) and os.path.isdir(folder_path):
                print(f"Deleting folder: {folder_path}")
                shutil.rmtree(folder_path)

def run_django_commands(base_path):
    """
    Ejecuta los comandos de Django para regenerar migraciones y correr el servidor.
    """
    commands = [
        "python manage.py makemigrations",
        "python manage.py makemigrations clientes",
        "python manage.py makemigrations sucursales",
        "python manage.py makemigrations cuentas",
        "python manage.py makemigrations prestamos",
        "python manage.py makemigrations tarjetas",
        "python manage.py makemigrations empleados",
        "python manage.py migrate",
        "python manage.py runserver"
    ]

    for command in commands:
        print(f"Running command: {command}")
        process = subprocess.run(command, shell=True, cwd=base_path)
        if process.returncode != 0:
            print(f"Command failed: {command}")
            break

if __name__ == "__main__":
    base_path = r'C:\Users\54911\Documents\itba\sprint8\server\homebanking'
    delete_db_and_specific_folders(base_path)
    run_django_commands(base_path)
