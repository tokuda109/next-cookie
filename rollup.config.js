/* eslint-disable */

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { dts } from 'rollup-plugin-dts'
import { uglify } from 'rollup-plugin-uglify'

module.exports = [
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/next-cookie.js',
      format: 'cjs'
    },
    external: [
      'cookie',
      'next',
      'react',
      'react-dom',
      'universal-cookie'
    ],
    jsnext: true,
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      process.env.NODE_ENV === 'production' ? uglify() : null
    ]
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/next-cookie.d.ts',
      format: 'es'
    },
    external: [
      'cookie',
      'next',
      'react',
      'react-dom',
      'universal-cookie'
    ],
    plugins: [
      dts()
    ]
  }
]
