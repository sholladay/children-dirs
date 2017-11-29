import fs from 'fs';
import path from 'path';
import util from 'util';
import test from 'ava';
import mkdirtemp from 'mkdirtemp';
import childrenDirs from '.';

const rmdir = util.promisify(fs.rmdir);

test.beforeEach(async (t) => {
    t.context.tempDir = await mkdirtemp();
});

test.afterEach.always(async (t) => {
    await rmdir(t.context.tempDir);
});

test('childrenDirs() basics', async (t) => {
    const dirs = await childrenDirs();
    t.truthy(dirs);
    t.true(Array.isArray(dirs));
    t.true(dirs.length > 0);
    t.true(dirs.includes(path.resolve('.git')));
    t.true(dirs.includes(path.resolve('fixture')));
    t.false(dirs.includes(path.resolve('package.json')));
    t.false(dirs.includes(__filename));
});

test('custom cwd', async (t) => {
    const dirs = await childrenDirs('fixture');
    t.false(dirs.includes(path.resolve('fixture', 'foo.txt')));
    t.deepEqual(dirs, [
        path.resolve('fixture', 'another'),
        path.resolve('fixture', 'nested')
    ]);
});

test('empty directory', async (t) => {
    const dirs = await childrenDirs(t.context.tempDir);
    t.truthy(dirs);
    t.true(Array.isArray(dirs));
    t.is(dirs.length, 0);
    t.deepEqual(dirs, []);
});
