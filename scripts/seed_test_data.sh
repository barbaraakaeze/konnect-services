#!/usr/bin/env bash
set -euo pipefail

CONTAINER="${CONTAINER:-postgres}"
DATABASE="${DATABASE:-konnectservices}"
PG_USER="${PG_USER:-konnectservices}"
FILENAME="${FILENAME:-sql/seed.sql}"
PSQL_COMMAND="${PSQL_COMMAND:-docker compose exec $CONTAINER psql}"

$PSQL_COMMAND \
-v ON_ERROR_STOP=1 \
--username="${PG_USER}" "${DATABASE}" --file ${FILENAME}
