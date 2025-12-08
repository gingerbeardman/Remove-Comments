exports.activate = function() {
	console.log("Remove Comments extension activated");
	nova.commands.register("com.gingerbeardman.removeComments", removeComments);
}

// Comment syntax definitions for various languages
const COMMENT_PATTERNS = {
	// C-style languages: JavaScript, Java, C, C++, C#, Swift, Kotlin, etc.
	'c-style': {
		lineComment: '//',
		blockCommentStart: '/*',
		blockCommentEnd: '*/'
	},
	// Python, Ruby, Shell, YAML, etc.
	'hash': {
		lineComment: '#'
	},
	// HTML, XML
	'html': {
		blockCommentStart: '<!--',
		blockCommentEnd: '-->'
	},
	// CSS, SCSS, Less
	'css': {
		blockCommentStart: '/*',
		blockCommentEnd: '*/'
	},
	// Lua
	'lua': {
		lineComment: '--',
		blockCommentStart: '--[[',
		blockCommentEnd: ']]'
	},
	// SQL
	'sql': {
		lineComment: '--',
		blockCommentStart: '/*',
		blockCommentEnd: '*/'
	},
	// Haskell
	'haskell': {
		lineComment: '--',
		blockCommentStart: '{-',
		blockCommentEnd: '-}'
	},
	// LaTeX
	'latex': {
		lineComment: '%'
	},
	// MATLAB
	'matlab': {
		lineComment: '%',
		blockCommentStart: '%{',
		blockCommentEnd: '%}'
	}
};

// Map of file extensions/syntax to comment patterns
const SYNTAX_MAP = {
	'javascript': 'c-style',
	'typescript': 'c-style',
	'jsx': 'c-style',
	'tsx': 'c-style',
	'java': 'c-style',
	'c': 'c-style',
	'cpp': 'c-style',
	'csharp': 'c-style',
	'swift': 'c-style',
	'kotlin': 'c-style',
	'go': 'c-style',
	'rust': 'c-style',
	'php': 'c-style',
	'objc': 'c-style',
	'objcpp': 'c-style',
	'dart': 'c-style',
	'python': 'hash',
	'ruby': 'hash',
	'shell': 'hash',
	'bash': 'hash',
	'perl': 'hash',
	'yaml': 'hash',
	'toml': 'hash',
	'coffeescript': 'hash',
	'r': 'hash',
	'html': 'html',
	'xml': 'html',
	'markdown': 'html',
	'css': 'css',
	'scss': 'css',
	'less': 'css',
	'lua': 'lua',
	'sql': 'sql',
	'haskell': 'haskell',
	'latex': 'latex',
	'tex': 'latex',
	'matlab': 'matlab'
};

function getCommentPattern(syntax) {
	const patternName = SYNTAX_MAP[syntax?.toLowerCase()] || 'c-style';
	return COMMENT_PATTERNS[patternName];
}

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeLineComment(line, pattern) {
	if (!pattern.lineComment) return line;

	const commentStart = pattern.lineComment;
	const escapedComment = escapeRegex(commentStart);

	// Check if the entire line is just a comment (with optional leading whitespace)
	const fullLineCommentRegex = new RegExp(`^\\s*${escapedComment}.*$`);
	if (fullLineCommentRegex.test(line)) {
		// Return empty string to remove the entire comment line
		return '';
	}

	// Check for trailing comments
	// Look for comment marker not in strings
	let inString = false;
	let stringChar = null;
	let escaped = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		if (escaped) {
			escaped = false;
			continue;
		}

		if (char === '\\' && inString) {
			escaped = true;
			continue;
		}

		if ((char === '"' || char === "'" || char === '`') && !inString) {
			inString = true;
			stringChar = char;
			continue;
		}

		if (char === stringChar && inString) {
			inString = false;
			stringChar = null;
			continue;
		}

		// If we find the comment start and we're not in a string
		if (!inString) {
			// Check if we have enough characters left for the comment marker
			if (i + commentStart.length <= line.length) {
				const nextChars = line.substring(i, i + commentStart.length);
				if (nextChars === commentStart) {
					// Remove the comment and any preceding whitespace
					return line.substring(0, i).trimEnd();
				}
			}
		}
	}

	return line;
}

function removeBlockComment(line, pattern) {
	if (!pattern.blockCommentStart || !pattern.blockCommentEnd) return line;

	const start = escapeRegex(pattern.blockCommentStart);
	const end = escapeRegex(pattern.blockCommentEnd);

	// Remove inline block comments (/* ... */ on same line)
	const blockCommentRegex = new RegExp(`${start}.*?${end}`, 'g');
	let result = line.replace(blockCommentRegex, '');

	// If the line is now empty or only whitespace, return empty string
	if (result.trim() === '') {
		return '';
	}

	return result;
}

function removeCommentsFromLine(line, pattern) {
	// First try to remove block comments
	let result = removeBlockComment(line, pattern);

	// Then try to remove line comments
	result = removeLineComment(result, pattern);

	return result;
}

async function removeComments() {
	console.log("Remove comments command triggered");
	const editor = nova.workspace.activeTextEditor;

	if (!editor) {
		console.error("No active text editor found");
		nova.workspace.showErrorMessage("No active text editor found.");
		return;
	}

	// Detect the syntax/language of the current document
	const syntax = editor.document.syntax;
	console.log(`Document syntax: ${syntax}`);

	const pattern = getCommentPattern(syntax);
	console.log(`Using comment pattern:`, pattern);

	// Get the selected range or current line
	let rangeToProcess;
	const selectedRange = editor.selectedRange;

	if (selectedRange.length === 0) {
		// No selection, get the range for the current line
		rangeToProcess = editor.document.getLineRangeForRange(selectedRange);
	} else {
		// Get the full line range that encompasses the selection
		rangeToProcess = editor.document.getLineRangeForRange(selectedRange);
	}

	console.log(`Processing range: ${rangeToProcess.start} to ${rangeToProcess.end}`);

	// Get the text in the range
	const originalText = editor.getTextInRange(rangeToProcess);
	console.log(`Original text length: ${originalText.length}`);

	// Split into lines, process each, and rejoin
	const lines = originalText.split(editor.document.eol);
	const processedLines = lines.map(line => removeCommentsFromLine(line, pattern));
	const newText = processedLines.join(editor.document.eol);

	// Only replace if something changed
	if (originalText !== newText) {
		editor.edit(edit => {
			edit.replace(rangeToProcess, newText);
		});
		console.log("Comments removed successfully");
	} else {
		console.log("No comments found to remove");
	}
}
