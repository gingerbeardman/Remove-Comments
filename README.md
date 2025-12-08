# Remove Comments

Remove Comments is an extension for the [Nova editor](https://nova.app).

It removes comments from the current line or selected lines in your code, supporting various programming languages.

## Features

- **Smart Comment Detection**: Automatically detects the comment format based on your document's language
- **Multiple Comment Types**: Handles both line comments (`//`, `#`, etc.) and block comments (`/* */`, `<!-- -->`, etc.)
- **String-Aware**: Won't remove comment markers that appear inside strings
- **Flexible Selection**: Works on the current line if nothing is selected, or all selected lines
- **Wide Language Support**: Supports 30+ programming languages including JavaScript, Python, Java, C, C++, Ruby, PHP, HTML, CSS, Lua, SQL, and many more

## Usage

1. Place your cursor on a line with a comment, or select multiple lines
2. Run the command "Remove Comments from Selection or Current Line" from the Command Palette
3. Comments will be removed from those lines

You can also assign a keyboard shortcut to this command in Nova's preferences (suggested: `Ctrl`+`Cmd`+`/`).

## Supported Languages

- **C-style** (`//` and `/* */`): JavaScript, TypeScript, Java, C, C++, C#, Swift, Kotlin, Go, Rust, PHP, Dart, Objective-C
- **Hash-style** (`#`): Python, Ruby, Shell, Bash, Perl, YAML, TOML, CoffeeScript, R
- **HTML-style** (`<!-- -->`): HTML, XML, Markdown
- **CSS-style** (`/* */`): CSS, SCSS, Less
- **Lua** (`--` and `--[[ ]]`)
- **SQL** (`--` and `/* */`)
- **Haskell** (`--` and `{- -}`)
- **LaTeX** (`%`)
- **MATLAB** (`%` and `%{ %}`)

See the internal [README](/Remove Comments.novaextension/README.md) for more info.

Recommended download from [Nova Extensions](https://extensions.panic.com/) website.

## Licence

[MIT](/LICENSE)
