import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    typescript({
      target: 'es2017',
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      extensions: ['.js', '.ts'],
    }),
    postcss({
      plugins: [
        'autoprefixer',
        'cssnano',
        'postcss-preset-env',
      ],
    }),
    terser({
      compress: {
        drop_console: true,
        level: 5
      }
    }),
  ],
};

export default config;