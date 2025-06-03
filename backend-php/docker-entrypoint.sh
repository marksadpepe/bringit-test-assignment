#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log "Checking PHP version..."
PHP_CURRENT_VERSION=$(php -r 'echo PHP_VERSION;')
PHP_EXPECTED_VERSION="8.3.7"

if [ "$PHP_CURRENT_VERSION" = "$PHP_EXPECTED_VERSION" ]; then
    success "PHP version confirmed: $PHP_CURRENT_VERSION"
else
    warning "PHP version mismatch. Expected: $PHP_EXPECTED_VERSION, Got: $PHP_CURRENT_VERSION"
fi

log "PHP Configuration:"
echo "  Version: $(php -r 'echo PHP_VERSION;')"
echo "  SAPI: $(php -r 'echo PHP_SAPI;')"
echo "  Extensions: $(php -m | tr '\n' ' ')"

PORT=${PORT:-8000}
HOST=${HOST:-0.0.0.0}

log "Starting PHP application..."
log "Server: ${HOST}:${PORT}"
log "Document root: $(pwd)"

if [ ! -f "index.php" ]; then
    error "index.php not found in $(pwd)!"
    error "Available files: $(ls -la)"
    exit 1
fi
success "index.php found"

if [ ! -z "$DB_HOST" ] && [ ! -z "$DB_PORT" ]; then
    log "Checking database connection to ${DB_HOST}:${DB_PORT}..."
    
    timeout=60
    while ! nc -z "$DB_HOST" "$DB_PORT" && [ $timeout -gt 0 ]; do
        log "Waiting for database... ($timeout seconds remaining)"
        sleep 2
        timeout=$((timeout-2))
    done
    
    if [ $timeout -le 0 ]; then
        error "Database connection timeout after 60 seconds"
        error "Failed to connect to ${DB_HOST}:${DB_PORT}"
        exit 1
    else
        success "Database is available at ${DB_HOST}:${DB_PORT}"
    fi
fi

if [ ! -r "index.php" ]; then
    error "No read permission for index.php"
    exit 1
fi

if command -v netstat >/dev/null 2>&1; then
    if netstat -tuln | grep -q ":$PORT "; then
        warning "Port $PORT is already in use"
    fi
fi

success "All checks passed. Starting PHP built-in server..."

exec php -S "${HOST}:${PORT}" -t /var/www/html 2>&1