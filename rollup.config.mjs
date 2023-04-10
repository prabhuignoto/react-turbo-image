import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';
import presetENV from 'postcss-preset-env';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };

const config = {
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
    name: pkg.name,
  },
  plugins: [
    typescript({
      target: 'es2021',
      declaration: true,
      declarationDir: 'dist',
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    // resolve({
    //   extensions: ['.jsx', '.tsx', '.ts'],
    // }),
    postcss({
      plugins: [autoprefixer, cssNano, presetENV],
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
