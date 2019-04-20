
import { join } from 'path'

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

module.exports = {
  input: 'src/main.ts',
  output: {
    file: 'dist/next-cookie.js',
    format: 'cjs'
  },
  external: [
    'cookie',
    'hoist-non-react-statics',
    'next',
    'react',
    'react-dom',
    'universal-cookie'
  ],
  jsnext: true,
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      declarationDir: join(__dirname, 'dist')
    })
  ]
}
