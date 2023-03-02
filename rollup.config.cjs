const alias = require('@rollup/plugin-alias');
const svelte = require('rollup-plugin-svelte');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const css = require('rollup-plugin-css-only');
const postcss = require('rollup-plugin-postcss');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const copy = require('rollup-plugin-copy');
const serve = require('./server/index');
const LiveServer = require('./server/live-server');
const path = require('path');

const production = !process.env.ROLLUP_WATCH;

const postcssPlugins = [
  require('postcss-import'),
  require('postcss-nested'),
  require('autoprefixer'),
  require('postcss-inline-svg'),
]

module.exports = [
  {
    input: 'src/server-entrypoint.js',
    output: {
      file: 'dist/server/bundle.js',
      format: 'cjs',
    },
    plugins: [
      alias({
        entries: [
          { find: '@blocks', replacement: path.resolve(process.cwd(), './src/blocks') },
          { find: '@shared', replacement: path.resolve(process.cwd(),'./src/shared') },
        ]
      }),
      css({ output: 'extra.css' }),
      svelte({
        compilerOptions: {
          dev: !production,
          tag: null,
          generate: 'ssr',
          immutable: true,
          hydratable: true,
        }
      }),
      postcss({
        extract: true,
        modules: true,
        plugins: postcssPlugins,
      }),
      image(),
      json(),
      nodeResolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
    ],
    watch: {
      clearScreen: false
    }
  },
  {
    input: 'src/client-entrypoint.js',
    output: {
      file: 'dist/client/bundle.js',
      format: 'iife',
    },
    plugins: [
      alias({
          entries: [
              { find: '@blocks', replacement: path.resolve(process.cwd(), './src/blocks') },
              { find: '@shared', replacement: path.resolve(process.cwd(),'./src/shared') }
          ]
      }),
      css({ output: 'extra.css' }),
      svelte({
        compilerOptions: {
        // enable run-time checks when not in production
          dev: !production,
          generate: 'dom',
          immutable: true,
          hydratable: true,
        }
      }),
      postcss({
        extract: true,
        modules: true,
        plugins: postcssPlugins,
      }),
      image(),
      json(),
      nodeResolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      copy({
        targets: [
          {
            src: 'src/blocks/block/assets/*',
            dest: 'dist/client/assets',
          },
          {
            src: 'global/*',
            dest: 'dist/client',
          },
        ],
      }),
      !production && serve(),
      !production && new LiveServer(process.env.LIVE_SERVER_PORT || 8080),
    ],
    watch: {
      clearScreen: false
    }
  },
]
