@guardian/grid-cli
==========================

Helpful commands for interacting with Grid, The Guardian&#39;s image management tool.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@guardian/grid-cli.svg)](https://npmjs.org/package/@guardian/grid-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@guardian/grid-cli.svg)](https://npmjs.org/package/@guardian/grid-cli)
[![License](https://img.shields.io/npm/l/@guardian/grid-cli.svg)](https://github.com/guardian/grid-cli/blob/main/package.json)

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
$ grid (--version)
@guardian/grid-cli/1.4.0 darwin-arm64 node-v16.17.0
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
* [`grid image:search [Q]`](#grid-imagesearch-q)
* [`grid image:upload IMAGE`](#grid-imageupload-image)
* [`grid image:visit ID`](#grid-imagevisit-id)
* [`grid util:curl URL`](#grid-utilcurl-url)
* [`grid util:id-file FILE`](#grid-utilid-file-file)

## `grid autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ grid autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ grid autocomplete

  $ grid autocomplete bash

  $ grid autocomplete zsh

  $ grid autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts)_

## `grid bulk:rights INPUT RIGHTS OUTPUT FAILURES`

Reads a text file containing image ids, and sets their usage rights.

```
USAGE
  $ grid bulk:rights [INPUT] [RIGHTS] [OUTPUT] [FAILURES] [-p <value>] [-f <value>] [-t] [-h]

ARGUMENTS
  INPUT     file to read, containing one grid id per line
  RIGHTS    (noRights|chargeable) usageRights to set
  OUTPUT    file to output results to
  FAILURES  file to write bad ids to

FLAGS
  -f, --field=<value>...  key or link name to print from each returned image, if none given then image will be output as
                          json
  -h, --help              Show CLI help.
  -p, --profile=<value>   [default: default] Profile name
  -t, --thumbnail         show a thumbnail

DESCRIPTION
  Reads a text file containing image ids, and sets their usage rights.
```

_See code: [src/commands/bulk/rights.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/bulk/rights.ts)_

## `grid collection:add-root NAME`

Add a root collection

```
USAGE
  $ grid collection:add-root [NAME] [-p <value>] [-h]

ARGUMENTS
  NAME  Root collection to add

FLAGS
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name

DESCRIPTION
  Add a root collection
```

_See code: [src/commands/collection/add-root.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/collection/add-root.ts)_

## `grid collection:move-images FROM TO`

Move images from one collection to another

```
USAGE
  $ grid collection:move-images [FROM] [TO] [-p <value>] [-h]

ARGUMENTS
  FROM  Collection to rename
  TO    Name of new collection

FLAGS
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name

DESCRIPTION
  Move images from one collection to another
```

_See code: [src/commands/collection/move-images.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/collection/move-images.ts)_

## `grid configuration:add`

Add a configuration profile

```
USAGE
  $ grid configuration:add [-p <value>] [-h] [-m <value>] [-k <value>]

FLAGS
  -h, --help                  Show CLI help.
  -k, --apiKey=<value>        API key
  -m, --mediaApiHost=<value>  Hostname for media-api
  -p, --profile=<value>       [default: default] Profile name

DESCRIPTION
  Add a configuration profile
```

_See code: [src/commands/configuration/add.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/configuration/add.ts)_

## `grid configuration:read`

Echos current config

```
USAGE
  $ grid configuration:read [-p <value>] [-h] [-a]

FLAGS
  -a, --all              show all profiles
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name

DESCRIPTION
  Echos current config
```

_See code: [src/commands/configuration/read.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/configuration/read.ts)_

## `grid help [COMMAND]`

Display help for grid.

```
USAGE
  $ grid help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for grid.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `grid image:delete ID`

Delete an image from Grid

```
USAGE
  $ grid image:delete [ID] [-p <value>] [-h]

ARGUMENTS
  ID  ID of image

FLAGS
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name

DESCRIPTION
  Delete an image from Grid
```

_See code: [src/commands/image/delete.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/delete.ts)_

## `grid image:download ID`

describe the command here

```
USAGE
  $ grid image:download [ID] [-p <value>] [-h] [-d <value>]

ARGUMENTS
  ID  ID of image

FLAGS
  -d, --directory=<value>  [default: /tmp] directory to download to
  -h, --help               Show CLI help.
  -p, --profile=<value>    [default: default] Profile name

DESCRIPTION
  describe the command here
```

_See code: [src/commands/image/download.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/download.ts)_

## `grid image:get [ID]`

Get an Image from the API

```
USAGE
  $ grid image:get [ID] [-p <value>] [-f <value>] [-t] [-h] [--hydrate]

ARGUMENTS
  ID  ID of image

FLAGS
  -f, --field=<value>...  key or link name to print from each returned image, if none given then image will be output as
                          json
  -h, --help              Show CLI help.
  -p, --profile=<value>   [default: default] Profile name
  -t, --thumbnail         show a thumbnail
  --hydrate               Gets fields which are returned as uris.

DESCRIPTION
  Get an Image from the API
```

_See code: [src/commands/image/get.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/get.ts)_

## `grid image:reingest ID`

Reingest an image already present in the images bucket

```
USAGE
  $ grid image:reingest [ID] [-p <value>] [-f <value>] [-t] [-h] [-d] [-c] [-f]

ARGUMENTS
  ID  ID of image

FLAGS
  -c, --compare           Do a dry run, and display the difference between the result and the data returned for this
                          image from media-api
  -d, --dryRun            Display the result of the reingestion only
  -f, --field=<value>...  key or link name to print from each returned image, if none given then image will be output as
                          json
  -f, --force             Force reingestion if the image is already present in the Grid
  -h, --help              Show CLI help.
  -p, --profile=<value>   [default: default] Profile name
  -t, --thumbnail         show a thumbnail

DESCRIPTION
  Reingest an image already present in the images bucket
```

_See code: [src/commands/image/reingest.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/reingest.ts)_

## `grid image:search [Q]`

Search for an Image from the API

```
USAGE
  $ grid image:search [Q] [-p <value>] [-f <value>] [-t] [-h]

ARGUMENTS
  Q  Search query

FLAGS
  -f, --field=<value>...  key or link name to print from each returned image, if none given then image will be output as
                          json
  -h, --help              Show CLI help.
  -p, --profile=<value>   [default: default] Profile name
  -t, --thumbnail         show a thumbnail

DESCRIPTION
  Search for an Image from the API
```

_See code: [src/commands/image/search.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/search.ts)_

## `grid image:upload IMAGE`

Upload an image to Grid. Can be a local file or a publicly accessible URL

```
USAGE
  $ grid image:upload [IMAGE] [-p <value>] [-h]

ARGUMENTS
  IMAGE  Image to upload. If a URL, it must be publicly accessible

FLAGS
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name

DESCRIPTION
  Upload an image to Grid. Can be a local file or a publicly accessible URL
```

_See code: [src/commands/image/upload.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/upload.ts)_

## `grid image:visit ID`

View image in the browser

```
USAGE
  $ grid image:visit [ID] [-p <value>] [-h]

ARGUMENTS
  ID  ID of image

FLAGS
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name

DESCRIPTION
  View image in the browser
```

_See code: [src/commands/image/visit.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/image/visit.ts)_

## `grid util:curl URL`

Make an authenticated request to a Grid URL. Assumes response is JSON.

```
USAGE
  $ grid util:curl [URL] [-p <value>] [-h] [-x GET|POST|PUT|PATCH|DELETE] [-d <value>]

ARGUMENTS
  URL  The URL to request

FLAGS
  -d, --data=<value>     The body of the request
  -h, --help             Show CLI help.
  -p, --profile=<value>  [default: default] Profile name
  -x, --method=<option>  [default: GET] The HTTP verb to use
                         <options: GET|POST|PUT|PATCH|DELETE>

DESCRIPTION
  Make an authenticated request to a Grid URL. Assumes response is JSON.
```

_See code: [src/commands/util/curl.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/util/curl.ts)_

## `grid util:id-file FILE`

Print the ID a file would get if uploaded to Grid

```
USAGE
  $ grid util:id-file [FILE] [-h]

ARGUMENTS
  FILE  Path to file to upload

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  Print the ID a file would get if uploaded to Grid
```

_See code: [src/commands/util/id-file.ts](https://github.com/guardian/grid-cli/blob/v1.4.0/src/commands/util/id-file.ts)_
<!-- commandsstop -->
