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
* [`grid collection:add-root NAME`](#grid-collectionadd-root-name)
* [`grid configuration:add`](#grid-configurationadd)
* [`grid configuration:read`](#grid-configurationread)
* [`grid help [COMMAND]`](#grid-help-command)
* [`grid image:get ID`](#grid-imageget-id)
* [`grid image:upload FILE`](#grid-imageupload-file)
* [`grid util:curl URL`](#grid-utilcurl-url)
* [`grid util:id-file FILE`](#grid-utilid-file-file)

## `grid collection:add-root NAME`

Add a root collection

```
USAGE
  $ grid collection:add-root NAME

ARGUMENTS
  NAME  Root collection to add

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/collection/add-root.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/collection/add-root.ts)_

## `grid configuration:add`

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
  -a, --all              show all profiles
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
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

## `grid image:get ID`

Get an Image from the API

```
USAGE
  $ grid image:get ID

ARGUMENTS
  ID  ID of image

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/get.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/image/get.ts)_

## `grid image:upload FILE`

Upload an image to Grid

```
USAGE
  $ grid image:upload FILE

ARGUMENTS
  FILE  Path to file to upload

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/upload.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/image/upload.ts)_

## `grid util:curl URL`

Make an authenticated request to a Grid URL. Assumes response is JSON.

```
USAGE
  $ grid util:curl URL

ARGUMENTS
  URL  The URL to request

OPTIONS
  -d, --data=data                         The body of the request
  -h, --help                              show CLI help
  -p, --profile=profile                   [default: default] Profile name
  -x, --method=GET|POST|PUT|PATCH|DELETE  [default: GET] The HTTP verb to use
```

_See code: [src/commands/util/curl.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/util/curl.ts)_

## `grid util:id-file FILE`

Print the ID a file would get if uploaded to Grid

```
USAGE
  $ grid util:id-file FILE

ARGUMENTS
  FILE  Path to file to upload

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/util/id-file.ts](https://github.com/guardian/grid-cli/blob/v0.0.0/src/commands/util/id-file.ts)_
<!-- commandsstop -->
