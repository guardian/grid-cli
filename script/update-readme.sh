#!/usr/bin/env bash

set -e

# force a recompilation, to ensure that oclif sees all written commands
npx tsc -b

npx oclif readme
