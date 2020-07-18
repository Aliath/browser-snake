import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';


export default {
  input: 'src/index.ts',
  output: {
    file: 'public/js/index.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
  ]
};