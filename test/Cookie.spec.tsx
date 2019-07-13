/* tslint:disable */

import { expect } from 'chai'
import { NextContext } from 'next'

import { Cookie } from '../src/Cookie'

describe('Cookie.ts', () => {

  describe('works properly when executing a constructor', () => {
    it('read a cookie string', () => {
      const c = new Cookie('testKey=testValue')

      expect(c.has('testKey')).to.be.true
      expect(c.get('testKey')).to.eql('testValue')
    })

    it('read a NextContext', () => {
      const dummyNextContext = {
        req: {
          headers: {
            cookie: 'testKey=testValue'
          }
        }
      }

      const c = new Cookie(dummyNextContext as NextContext)

      expect(c.has('testKey')).to.be.true
      expect(c.get('testKey')).to.eql('testValue')
    })
  })
})
