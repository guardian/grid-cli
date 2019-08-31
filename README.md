@guardian/grid-cli
==========================

Helpful commands for interacting with Grid, The Guardian&#39;s image management tool.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@guardian/grid-cli.svg)](https://npmjs.org/package/@guardian/grid-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@guardian/grid-cli.svg)](https://npmjs.org/package/@guardian/grid-cli)
[![License](https://img.shields.io/npm/l/@guardian/grid-cli.svg)](https://github.com/guardian/grid-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @guardian/grid-cli
$ grid COMMAND
running command...
$ grid (-v|--version|version)
@guardian/grid-cli/0.0.0 darwin-x64 node-v12.9.1
$ grid --help [COMMAND]
USAGE
  $ grid COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`grid configuration:add`](#grid-configurationadd)
* [`grid configuration:read`](#grid-configurationread)
* [`grid help [COMMAND]`](#grid-help-command)


Add a configuration profile

```
USAGE
  $ grid configuration:add

OPTIONS
  -h, --help                       show CLI help
  -k, --apiKey=apiKey              (required) API key
  -m, --mediaApiHost=mediaApiHost  (required) Hostname for media-api
  -p, --profile=profile            [default: default] Profile name
```

_See code: [src/commands/configuration/add.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/configuration/add.ts)_

## `grid configuration:read`

Echos current config

```
USAGE
  $ grid configuration:read

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  Profile name
```

_See code: [src/commands/configuration/read.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/configuration/read.ts)_

## `grid help [COMMAND]`

display help for grid

```
USAGE
  $ grid help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
