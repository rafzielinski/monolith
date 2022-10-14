// #<{(|*
//  * Script to run after npm install
//  *
//  * Copy selected files to user's directory
//  |)}>#
// 'use strict'
//
// var gentlyCopy = require('gently-copy')
//
// var src = ['src/scss']
//
// // User's local directory
// var dest = process.env.INIT_CWD + '/' + process.env.MONO_LOCAL_PATH
//
// // Moving files to user's local directory
// gentlyCopy(src, dest)








//Copy the scss folder to the root of the prokect when install by NPM
//Copy a starter package.json from helper to the root of project when install by NPM

const fs = require('fs-extra');

// Async/Await:
async function copyFiles() {
  const src = 'src/scss'
  const cwd = process.env.INIT_CWD
  const env = require('env2')(cwd + '/.env');
  const userPath = process.env.MONO_LOCAL_PATH + '/mono/'
  const dest = cwd + '/' + userPath
  try {
    await fs.copy(src, dest, {
      overwrite: process.env.MONO_OVERWRITE || false,
      errorOnExist: true,
    });
    console.log(
      '\x1b[32m',
      `Yay! Mono was copied to: ${userPath}. Add @import '${userPath}'; to your main scss file.`
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

copyFiles();








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
