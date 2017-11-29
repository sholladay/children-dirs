'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const childrenDirs = async (dirPath) => {
    const cwd = path.resolve(dirPath || process.cwd());

    const fileNames = await readdir(cwd);

    const filePaths = await Promise.all(fileNames.map(async (fileName) => {
        const filePath = path.join(cwd, fileName);
        const status = await stat(filePath);
        return status.isDirectory() ? filePath : null;
    }));

    return filePaths.filter((filePath) => {
        return filePath !== null;
    });
};

module.exports = childrenDirs;
