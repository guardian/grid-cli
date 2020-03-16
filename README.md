@guardian/grid-cli
==========================

Helpful commands for interacting with Grid, The Guardian&#39;s image management tool.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@guardian/grid-cli.svg)](https://npmjs.org/package/@guardian/grid-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@guardian/grid-cli.svg)](https://npmjs.org/package/@guardian/grid-cli)
[![License](https://img.shields.io/npm/l/@guardian/grid-cli.svg)](https://github.com/guardian/grid-cli/blob/master/package.json)

<!-- toc -->
* [Installing](#installing)
* [Usage](#usage)
* [Developing](#developing)
* [Commands](#commands)
<!-- tocstop -->
# Installing
<!-- installing -->
grid-cli can be installed using either NPM or Brew

## NPM
```sh
npm install -g @guardian/grid-cli
````

<!-- installingstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @guardian/grid-cli
$ grid COMMAND
running command...
$ grid (-v|--version|version)
@guardian/grid-cli/1.1.0 darwin-x64 node-v12.13.1
$ grid --help [COMMAND]
USAGE
  $ grid COMMAND
...
```
<!-- usagestop -->
# Developing
<!-- developing -->
There are a few handy scripts in the [./script](script) directory. Hopefully they are self documenting...
<!-- developingstop -->
# Commands
<!-- commands -->
* [`grid autocomplete [SHELL]`](#grid-autocomplete-shell)
* [`grid collection:add-root NAME`](#grid-collectionadd-root-name)
* [`grid configuration:add`](#grid-configurationadd)
* [`grid configuration:read`](#grid-configurationread)
* [`grid help [COMMAND]`](#grid-help-command)
* [`grid image:delete ID`](#grid-imagedelete-id)
* [`grid image:download ID`](#grid-imagedownload-id)
* [`grid image:get [ID]`](#grid-imageget-id)
* [`grid image:reindex ID`](#grid-imagereindex-id)
* [`grid image:upload IMAGE`](#grid-imageupload-image)
* [`grid image:visit ID`](#grid-imagevisit-id)
* [`grid util:curl URL`](#grid-utilcurl-url)
* [`grid util:id-file FILE`](#grid-utilid-file-file)

## `grid autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ grid autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ grid autocomplete
  $ grid autocomplete bash
  $ grid autocomplete zsh
  $ grid autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.3/src/commands/autocomplete/index.ts)_

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

_See code: [src/commands/collection/add-root.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/collection/add-root.ts)_

## `grid configuration:add`

Add a configuration profile

```
USAGE
  $ grid configuration:add

OPTIONS
  -h, --help                       show CLI help
  -k, --apiKey=apiKey              API key
  -m, --mediaApiHost=mediaApiHost  Hostname for media-api
  -p, --profile=profile            [default: default] Profile name
```

_See code: [src/commands/configuration/add.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/configuration/add.ts)_

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

_See code: [src/commands/configuration/read.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/configuration/read.ts)_

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

## `grid image:delete ID`

Delete an image from Grid

```
USAGE
  $ grid image:delete ID

ARGUMENTS
  ID  ID of image

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/delete.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/image/delete.ts)_

## `grid image:download ID`

describe the command here

```
USAGE
  $ grid image:download ID

ARGUMENTS
  ID  ID of image

OPTIONS
  -d, --directory=directory  [default: /tmp] directory to download to
  -h, --help                 show CLI help
  -p, --profile=profile      [default: default] Profile name
```

_See code: [src/commands/image/download.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/image/download.ts)_

## `grid image:get [ID]`

Get an Image from the API

```
USAGE
  $ grid image:get [ID]

ARGUMENTS
  ID  ID of image

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/get.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/image/get.ts)_

## `grid image:reindex ID`

Reindex an image already present in the images bucket

```
USAGE
  $ grid image:reindex ID

ARGUMENTS
  ID  ID of image

OPTIONS
  -c, --compare          Do a dry run, and display the difference between the result and the data returned for this
                         image from media-api

  -d, --dryRun           Display the result of the reingestion only

  -h, --help             show CLI help

  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/reindex.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/image/reindex.ts)_

## `grid image:upload IMAGE`

Upload an image to Grid. Can be a local file or a publicly accessible URL

```
USAGE
  $ grid image:upload IMAGE

ARGUMENTS
  IMAGE  Image to upload. If a URL, it must be publicly accessible

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/upload.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/image/upload.ts)_

## `grid image:visit ID`

View image in the browser

```
USAGE
  $ grid image:visit ID

ARGUMENTS
  ID  ID of image

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/visit.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/image/visit.ts)_

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

_See code: [src/commands/util/curl.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/util/curl.ts)_

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

_See code: [src/commands/util/id-file.ts](https://github.com/guardian/grid-cli/blob/v1.1.0/src/commands/util/id-file.ts)_
<!-- commandsstop -->
