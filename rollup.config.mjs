import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';
import presetENV from 'postcss-preset-env';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };

const config = {
  input: 'src/react-turbo-image.tsx',
  output: {
    file: 'dist/react-turbo-image.js',
    format: 'esm',
    sourcemap: true,
    name: pkg.name,
    banner: () => `/*!
    * ${pkg.name} v${pkg.version}
    * (c) ${new Date().getFullYear()} Prabhu Murthy
    * License: MIT
    */`,
  },
  plugins: [
    del({ targets: 'dist/*' }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      target: 'es2021',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['node_modules/**', 'src/**/*.test.tsx', 'src/App.tsx', 'src/main.tsx'],
    }),
    postcss({
      extract: true,
      minimize: true,
      name: 'react-turbo-image.css',
      plugins: [
        autoprefixer,
        cssNano({
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        }),
        presetENV,
      ],
    }),
    terser({
      compress: {
        drop_console: true,
        // level: 5,
      },
    }),
  ],
};

export default config;
