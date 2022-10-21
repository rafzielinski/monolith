#!/usr/bin/env node
'use strict';

import meow from 'meow';
import copyFiles from './scripts/copyFiles.js';
import transformTokens from './scripts/transformTokens.js'

const pkgName = 'MONO';
const pkgFolderName = 'mono';

const cli = meow(`
	Usage
	$ ${pkgFolderName} <command> <options>

	Commands
		copy  Copies ${pkgName} folder to destination directory.

	Options
		--dest, -d  Destination path inside the project where ${pkgFolderName} folder should be copied to.
		--overwrite, -o  Overwrite files on copy.

	Examples
		$ foo --dest path/to/scss -o
`, {
	importMeta: import.meta,
	flags: {
		dest: {
			type: 'string',
			alias: 'd',
			// isRequired: true
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

// copyFiles(cli.flags.dest, cli.flags.overwrite)

console.log(copyFiles, transformTokens)

