# VS Code extension for Typhoon-HIL DSLs

This extension enables convenient editing of `.tse`,`.lib`,`.cmp`, and `.tml`
DSL files used in the Typhoon-HIL tool-chain.

The extension is published on the [VS Code
marketplace](https://marketplace.visualstudio.com/items?itemName=typhoon-hil.vscode-typhoondsl)
and can be installed directly from [VS Code
editor](https://code.visualstudio.com/).

![TyphoonDSL editor](https://raw.githubusercontent.com/typhoon-hil/vscode-typhoondsl/main/images/typhoondsl-editor.png)


## Features

- Syntax highlighting
- Code folding
- Embedded Python code editing (using
  [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python))
- Code snippets:
  - tse/tlib/comp (`comp`, `term`, `prop`, `code`)
  - tml (`fn`,`if`,`for`, `while`)
- Outline and breadcrumbs


## Planned

- Language Server Protocol support
- Error reporting
- Code completion (component types from the available libraries, component properties...)
- Quick fixes


## Requirements

Embedded Python is supported by
[Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
extension. 


## Extension Settings

This extensions has no settings.
