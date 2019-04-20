/* tslint:disable: variable-name */

import * as parser from 'cookie'
import { NextContext } from 'next'
import universalCookie, { CookieSetOptions } from 'universal-cookie'

class Cookie {

  ctx?: NextContext

  cookie: universalCookie

  isServer: boolean

  constructor(ctx?: NextContext) {
    if (ctx && typeof ctx.req !== 'undefined') {
      this.ctx = ctx
      this.cookie = new universalCookie(ctx.req.headers.cookie)
      this.isServer = true
    } else if (typeof navigator !== 'undefined') {
      this.ctx = ctx
      this.cookie = new universalCookie()
      this.isServer = false
    }
  }

  get(name: string): any {
    return this.cookie.get(name)
  }

  set(name: string, value: any, options?: CookieSetOptions) {
    if (this.isServer) {
      this.ctx.res.setHeader(
        'Set-Cookie',
        parser.serialize(name, value, options as parser.CookieSerializeOptions),
      )
    } else {
      this.cookie.set(name, value, options)
    }
  }
}

export { Cookie }
