#!/bin/sh

# Skip waiting for local DB as we are using an external database
echo "Starting application with external database..."

if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running migrations..."
    python manage.py makemigrations users
    python manage.py makemigrations birthdays
    python manage.py migrate
    python manage.py collectstatic --no-input
fi

exec "$@"
