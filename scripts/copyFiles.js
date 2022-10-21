'use strict'

import fs from 'fs-extra';

// Async/Await:
async function copyFiles(destination, overwrite) {
  const cwd = process.env.PWD
  const userPath = (destination + '/mono/').replace('//', '/')
  const src = (cwd + '/node_modules/monolith/src/mono').replace('//','/')
  const dest = (cwd + '/' + userPath).replace('//','/')

console.log('from : ', src)
console.log('to : ', dest)

  try {
    await fs.copy(src, dest, {
      overwrite: overwrite,
      errorOnExist: true,
    });
    console.log(
      '\x1b[32m',
      `Yay! Mono was copied to: ${dest}. Add @import '${userPath}'; to your main scss file.`
    );
    return true;
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(
        '\x1b[36m',
        `It looks like ${userPath} folder already exist. Complementary files were added to it. Use MONO_OVERWRITE=true to overwrite files.`
      );
      return false;
    }
    throw error;
  }
}

export default copyFiles;








// Adding commands to script key in package.json at root level of project
// const saveFile = require('fs').writeFileSync;
// const pkgJsonPath =
//   require.main.paths[0].split('node_modules')[0] + 'package.json';
// const json = require(pkgJsonPath);
//
// if (!json.hasOwnProperty('scripts')) {
//   json.scripts = {};
// }
//
// json.scripts['cs-watch'] = 'sass scss/main.scss css/style.css --watch --no-source-map';
// json.scripts['cs-compile'] = 'sass scss/main.scss css/style.css --no-source-map';
// json.scripts['cs-compress'] = 'sass scss/main.scss css/style.css --style=compressed --no-source-map';
// json.scripts['cs-prefix'] = "postcss css/style.css -o css/style.css --use autoprefixer -b 'last 4 versions' --no-source-map";
// json.scripts['cs-build'] = 'npm-run-all cs-compile cs-compress cs-prefix';
// saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
