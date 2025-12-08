**Remove Comments** allows you to quickly remove comments from your code!

It works on the current line or all selected lines, and automatically detects the comment format based on your document's language.

## Usage

To run Remove Comments:

- Select the **Editor → Remove Comments from Selection or Current Line**
- Open the command palette and type `Remove Comments`

You might also choose to set a keyboard shortcut using **Nova → Settings... → Key Bindings**, such as:

- `Ctrl`+`Cmd`+`/` to invoke **Remove Comments from Selection or Current Line**

## How It Works

1. **No Selection**: If you don't have any text selected, the extension will remove comments from the current line where your cursor is positioned.

2. **With Selection**: If you have selected multiple lines, the extension will remove comments from all selected lines.

3. **Smart Detection**: The extension automatically detects your document's language and uses the appropriate comment syntax:
   - Line comments like `//`, `#`, `--`, `%`
   - Block comments like `/* */`, `<!-- -->`, `--[[ ]]`

4. **String-Aware**: Comment markers inside strings are preserved and won't be removed.

## Examples

**JavaScript (C-style comments):**
```javascript
// This comment will be removed
const x = 10; // This trailing comment will be removed
/* This block comment will be removed */
```

After running Remove Comments:
```javascript

const x = 10;

```

**Python (hash-style comments):**
```python
# This comment will be removed
value = 42  # This trailing comment will be removed
```

After running Remove Comments:
```python

value = 42
```

**HTML:**
```html
<!-- This comment will be removed -->
<div>Content</div> <!-- This trailing comment will be removed -->
```

After running Remove Comments:
```html

<div>Content</div>
```

## Supported Languages

The extension supports 30+ programming languages including:

- **C-style** (`//` and `/* */`): JavaScript, TypeScript, Java, C, C++, C#, Swift, Kotlin, Go, Rust, PHP, Dart, Objective-C
- **Hash-style** (`#`): Python, Ruby, Shell, Bash, Perl, YAML, TOML, CoffeeScript, R
- **HTML-style** (`<!-- -->`): HTML, XML, Markdown
- **CSS-style** (`/* */`): CSS, SCSS, Less
- **Lua** (`--` and `--[[ ]]`)
- **SQL** (`--` and `/* */`)
- **Haskell** (`--` and `{- -}`)
- **LaTeX** (`%`)
- **MATLAB** (`%` and `%{ %}`)

If your language isn't automatically detected, the extension defaults to C-style comments.
