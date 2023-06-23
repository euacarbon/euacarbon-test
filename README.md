EUA Carbon Test Tool
=================

This is a basic Swiss Army-knife command line tool for the EUA carbon coin. Starting
with the most basic functionality to issue the token, this will grow to be our main
admin tool for the first stages of the project.

Currently the tool does two things:
* Issue the token
* Send it to someone

Using XRLP, the core token functionality is part of the ledger, so this does far less
than its Ethereum equivalent!

Future Functionality
---------
* Whitelisting using either Trust Lines or whitelists in Hook Storage.
    * Building an Oracle for Xumm KYC status
    * How to handle jurisdictional restrictions?
* Retiring credits through blackhole
    * Using Emitted Transactions to generate receipt NFTs?
* XLS-30d AMM liquidity provision in addition to native ledger bid/ask
    * Need to research capital efficiency.
    * Need to estimate behaviour under market dislocations
* Bridging to ERC20/BIP20

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
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
* [`euacarbon create-token`](#euacarbon-create-token)
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
* [`euacarbon send-to TOADDRESS`](#euacarbon-send-to-toaddress)

## `euacarbon create-token`

Create the token.

```
USAGE
  $ euacarbon create-token

DESCRIPTION
  Create the token.

EXAMPLES
  $ euacarbon create-token
```

_See code: [dist/commands/create-token.ts](https://github.com/euacarbon/euacarbon/blob/v0.0.0/dist/commands/create-token.ts)_

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

## `euacarbon send-to TOADDRESS`

Send some tokens from the hot wallet.

```
USAGE
  $ euacarbon send-to TOADDRESS

ARGUMENTS
  TOADDRESS  XRPL address to send to

DESCRIPTION
  Send some tokens from the hot wallet.

EXAMPLES
  $ euacarbon send
```

_See code: [dist/commands/send-to.ts](https://github.com/euacarbon/euacarbon/blob/v0.0.0/dist/commands/send-to.ts)_
<!-- commandsstop -->
