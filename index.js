'use strict';

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
            return fileNames.map((fileName) => {
                return path.join(cwd, fileName);
            });
        })
        .then((filePaths) => {
            return Promise.all(filePaths.map((filePath) => {
                return stat(filePath).then((status) => {
                    return {
                        path        : filePath,
                        isDirectory : status.isDirectory()
                    };
                });
            }));
        })
        .then((files) => {
            return files
                .filter((file) => {
                    return file.isDirectory;
                })
                .map((file) => {
                    return file.path;
                });
        });
};

module.exports = childrenDirs;
