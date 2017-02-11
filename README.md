# children-dirs [![Build status for children-dirs on Circle CI.](https://img.shields.io/circleci/project/sholladay/children-dirs/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/children-dirs "Children Dirs Builds")

> Get paths of directories in a directory.

## Why?

 - Lists only directories, unlike [`fs.readdir()`](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback).
 - Uses [`process.cwd()`](https://nodejs.org/api/process.html#process_process_cwd) by default.
 - Resilient to race conditions involving [`process.chdir()`](https://nodejs.org/api/process.html#process_process_chdir_directory).

## Install

```sh
npm install children-dirs --save
```

## Usage

Get it into your program.

```js
const childrenDirs = require('children-dirs');
```

Get a list of directories.

```js
const dirs = await childrenDirs();
console.log(dirs);
// => ['/home/me/my-project/.git', '/home/me/my-project/lib']
```

## API

### childrenDirs(cwd)

Returns a `Promise` for an `Array` of absolute paths for directories that are immediate children of `cwd`.

#### cwd

Type: `string`<br>
Default: `process.cwd()`

The directory to search.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/children-dirs/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/children-dirs/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/children-dirs/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/children-dirs/blob/master/LICENSE "The license for children-dirs.") © [Seth Holladay](http://seth-holladay.com "Author of children-dirs.")

Go make something, dang it.
