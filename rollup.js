/* eslint-disable import/unambiguous, import/no-commonjs */
const {rollup} = require('rollup');
const postcss = require('rollup-plugin-postcss');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const autoExternal = require('rollup-plugin-auto-external');
const sourcemaps = require('rollup-plugin-sourcemaps');
const babel = require('rollup-plugin-babel');
const {eslint} = require('rollup-plugin-eslint');
const {terser} = require('rollup-plugin-terser');

const inputOptions = {
    input: 'src/index.js',
    plugins: [
        eslint({throwOnError: true, include: 'src/**/*.js'}),
        postcss({extract: 'style/index.css', minimize: true}),
        resolve({main: true, module: true}),
        commonjs({include: 'node_modules/**'}),
        autoExternal({dependencies: false}),
        sourcemaps(),
        babel({exclude: 'node_modules/**'}),
        terser()
    ]
};

// TODO: https://github.com/TrySound/rollup-plugin-terser/issues/5
const build = async filename => {
    const cjs = await rollup(inputOptions);
    cjs.write({format: 'cjs', file: `cjs/index.js`, sourcemap: true});
    const es = await rollup(inputOptions);
    es.write({format: 'es', file: `es/index.js`, sourcemap: true});
};

build();
