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
@guardian/grid-cli/1.2.0 darwin-x64 node-v12.9.1
$ grid --help [COMMAND]
USAGE
  $ grid COMMAND
...
```
<!-- usagestop -->
# Developing
<!-- developing -->
There are a few handy scripts in the [./script](script) directory. 
* `new-command.sh` which creates new commands, `./scripts/new-command.sh a/b` to create `a:b`
* `update-readme.sh` which you should run before committing. 

To run the development build of the script, you can run `npm run local`.
<!-- developingstop -->
# Commands
<!-- commands -->
* [`grid autocomplete [SHELL]`](#grid-autocomplete-shell)
* [`grid bulk:rights INPUT RIGHTS OUTPUT FAILURES`](#grid-bulkrights-input-rights-output-failures)
* [`grid collection:add-root NAME`](#grid-collectionadd-root-name)
* [`grid collection:move-images FROM TO`](#grid-collectionmove-images-from-to)
* [`grid configuration:add`](#grid-configurationadd)
* [`grid configuration:read`](#grid-configurationread)
* [`grid help [COMMAND]`](#grid-help-command)
* [`grid image:delete ID`](#grid-imagedelete-id)
* [`grid image:download ID`](#grid-imagedownload-id)
* [`grid image:get [ID]`](#grid-imageget-id)
* [`grid image:reingest ID`](#grid-imagereingest-id)
* [`grid image:search [FILE]`](#grid-imagesearch-file)
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

## `grid bulk:rights INPUT RIGHTS OUTPUT FAILURES`

Reads a text file containing image ids, and sets their usage rights.

```
USAGE
  $ grid bulk:rights INPUT RIGHTS OUTPUT FAILURES

ARGUMENTS
  INPUT     file to read, containing one grid id per line
  RIGHTS    (noRights|chargeable) usageRights to set
  OUTPUT    file to output results to
  FAILURES  file to write bad ids to

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/bulk/rights.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/bulk/rights.ts)_

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

_See code: [src/commands/collection/add-root.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/collection/add-root.ts)_

## `grid collection:move-images FROM TO`

Move images from one collection to another

```
USAGE
  $ grid collection:move-images FROM TO

ARGUMENTS
  FROM  Collection to rename
  TO    Name of new collection

OPTIONS
  -h, --help             show CLI help
  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/collection/move-images.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/collection/move-images.ts)_

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

_See code: [src/commands/configuration/add.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/configuration/add.ts)_

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

_See code: [src/commands/configuration/read.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/configuration/read.ts)_

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

_See code: [src/commands/image/delete.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/delete.ts)_

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

_See code: [src/commands/image/download.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/download.ts)_

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

_See code: [src/commands/image/get.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/get.ts)_

## `grid image:reingest ID`

Reingest an image already present in the images bucket

```
USAGE
  $ grid image:reingest ID

ARGUMENTS
  ID  ID of image

OPTIONS
  -c, --compare          Do a dry run, and display the difference between the result and the data returned for this
                         image from media-api

  -d, --dryRun           Display the result of the reingestion only

  -f, --force            Force reingestion if the image is already present in the Grid

  -h, --help             show CLI help

  -p, --profile=profile  [default: default] Profile name
```

_See code: [src/commands/image/reingest.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/reingest.ts)_

## `grid image:search [FILE]`

describe the command here

```
USAGE
  $ grid image:search [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/image/search.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/search.ts)_

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

_See code: [src/commands/image/upload.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/upload.ts)_

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

_See code: [src/commands/image/visit.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/image/visit.ts)_

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

_See code: [src/commands/util/curl.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/util/curl.ts)_

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

_See code: [src/commands/util/id-file.ts](https://github.com/guardian/grid-cli/blob/v1.2.0/src/commands/util/id-file.ts)_
<!-- commandsstop -->
