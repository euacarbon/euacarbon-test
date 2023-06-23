oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g euacarbon
$ euacarbon COMMAND
running command...
$ euacarbon (--version)
euacarbon/0.0.0 linux-arm64 node-v20.2.0
$ euacarbon --help [COMMAND]
USAGE
  $ euacarbon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`euacarbon hello PERSON`](#euacarbon-hello-person)
* [`euacarbon hello world`](#euacarbon-hello-world)
* [`euacarbon help [COMMANDS]`](#euacarbon-help-commands)
* [`euacarbon plugins`](#euacarbon-plugins)
* [`euacarbon plugins:install PLUGIN...`](#euacarbon-pluginsinstall-plugin)
* [`euacarbon plugins:inspect PLUGIN...`](#euacarbon-pluginsinspect-plugin)
* [`euacarbon plugins:install PLUGIN...`](#euacarbon-pluginsinstall-plugin-1)
* [`euacarbon plugins:link PLUGIN`](#euacarbon-pluginslink-plugin)
* [`euacarbon plugins:uninstall PLUGIN...`](#euacarbon-pluginsuninstall-plugin)
* [`euacarbon plugins:uninstall PLUGIN...`](#euacarbon-pluginsuninstall-plugin-1)
* [`euacarbon plugins:uninstall PLUGIN...`](#euacarbon-pluginsuninstall-plugin-2)
* [`euacarbon plugins update`](#euacarbon-plugins-update)

## `euacarbon hello PERSON`

Say hello

```
USAGE
  $ euacarbon hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/euacarbon/euacarbon/blob/v0.0.0/dist/commands/hello/index.ts)_

## `euacarbon hello world`

Say hello world

```
USAGE
  $ euacarbon hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ euacarbon hello world
  hello world! (./src/commands/hello/world.ts)
```

## `euacarbon help [COMMANDS]`

Display help for euacarbon.

```
USAGE
  $ euacarbon help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for euacarbon.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `euacarbon plugins`

List installed plugins.

```
USAGE
  $ euacarbon plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ euacarbon plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `euacarbon plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ euacarbon plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ euacarbon plugins add

EXAMPLES
  $ euacarbon plugins:install myplugin 

  $ euacarbon plugins:install https://github.com/someuser/someplugin

  $ euacarbon plugins:install someuser/someplugin
```

## `euacarbon plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ euacarbon plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ euacarbon plugins:inspect myplugin
```

## `euacarbon plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ euacarbon plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ euacarbon plugins add

EXAMPLES
  $ euacarbon plugins:install myplugin 

  $ euacarbon plugins:install https://github.com/someuser/someplugin

  $ euacarbon plugins:install someuser/someplugin
```

## `euacarbon plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ euacarbon plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ euacarbon plugins:link myplugin
```

## `euacarbon plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ euacarbon plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ euacarbon plugins unlink
  $ euacarbon plugins remove
```

## `euacarbon plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ euacarbon plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ euacarbon plugins unlink
  $ euacarbon plugins remove
```

## `euacarbon plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ euacarbon plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ euacarbon plugins unlink
  $ euacarbon plugins remove
```

## `euacarbon plugins update`

Update installed plugins.

```
USAGE
  $ euacarbon plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->