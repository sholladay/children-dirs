'use strict';

const fs = require('fs');
const path = require('path');
const pify = require('pify');

const readdir = pify(fs.readdir);
const stat = pify(fs.stat);

const childrenDirs = (dirPath) => {
    const cwd = path.resolve(dirPath || process.cwd());

    return readdir(cwd)
        .then((fileNames) => {
            return Promise.all(fileNames.map((fileName) => {
                const filePath = path.join(cwd, fileName);
                return stat(filePath).then((status) => {
                    return status.isDirectory() ? filePath : null;
                });
            }));
        })
        .then((filePaths) => {
            return filePaths.filter((filePath) => {
                return filePath !== null;
            });
        });
};

module.exports = childrenDirs;
