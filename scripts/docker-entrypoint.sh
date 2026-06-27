#!/bin/sh
set -e

# NextAuth requires a secret in production. Generate one for zero-config
# deployments while still allowing operators to provide a stable value.
if [ -z "$NEXTAUTH_SECRET" ]; then
  export NEXTAUTH_SECRET="$(openssl rand -base64 48)"
  echo "NEXTAUTH_SECRET was not provided; generated one for this container."
fi

if [ -n "$DATABASE_URL" ] && [ "${PRISMA_SKIP_DEPLOY:-0}" != "1" ]; then
  if [ -d "./prisma/migrations" ] && [ "$(find ./prisma/migrations -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "Applying Prisma migrations..."
    node ./node_modules/prisma/build/index.js migrate deploy
  else
    echo "No Prisma migrations found; syncing schema with prisma db push..."
    node ./node_modules/prisma/build/index.js db push --skip-generate
  fi
fi

exec "$@"
