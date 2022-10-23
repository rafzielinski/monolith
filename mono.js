#!/usr/bin/env node
'use strict';

import meow from 'meow';
import copyFiles from './scripts/copyFiles.js';
import transformTokens from './scripts/transformTokens.js'

const pkgName = 'MONO';
const pkgCommand = 'mono';
const pkgFolderName = 'mono';

const cli = meow(`
	Usage
	$ ${pkgCommand} <command> <options>

	Commands
		copy <options -do> Copies ${pkgName} folder to destination directory.
		tokens <options -dt> Generates SCSS tokens from JSON file

	Options
		--token, -t  Tokens source file exported from Figma in JSON file
		--dest, -d  Destination path inside the project where ${pkgFolderName} folder should be copied to.
		--overwrite, -o  Overwrite files on copy.

	Examples
		$ ${pkgCommand} copy --dest path/to/scss -o
		$ ${pkgCommand} tokens -t ./tokens.json
`, {
	importMeta: import.meta,
	flags: {
		token: {
			type: 'string',
			alias: 't',
			isRequired: (flags, input) => input[0] == 'tokens' ? true : false
		},
		dest: {
			type: 'string',
			alias: 'd',
			isRequired: (flags, input) => input[0] == 'copy' ? true : false
		},
		overwrite: {
			type: 'boolean',
			alias: 'o',
			default: false
		}
	}
});

// const [,, ...args] = process.argv
console.log(`hellooooo ${JSON.stringify(cli, null, 4)}`)

const command = cli.input[0];

if (command == 'copy') {
	copyFiles(cli.flags.dest, cli.flags.overwrite)
} else if (command == 'tokens') {
	transformTokens(cli.flags.dest, cli.flags.token)
}

console.log(copyFiles, transformTokens)

