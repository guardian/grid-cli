#!/usr/bin/env bash

set -e

COMMAND_NAME=$1

if [ -z "${COMMAND_NAME}" ];
then
    echo "Please specify command name"
    exit 1
fi

npx oclif command "$COMMAND_NAME"
