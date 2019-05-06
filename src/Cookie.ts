/* tslint:disable: variable-name */

import * as parser from 'cookie'
import { NextContext } from 'next'
import universalCookie, { CookieSetOptions } from 'universal-cookie'

class Cookie {

  ctx?: NextContext

  cookie: universalCookie

  isServer: boolean

  constructor(ctxOrCookie?: NextContext | string) {
    if (typeof navigator !== 'undefined') {
      this.isServer = false

      let cookieString
      if (typeof ctxOrCookie === 'string') {
        cookieString = ctxOrCookie
      }

      this.cookie = new universalCookie(cookieString)
    } else {
      this.isServer = true

      if (typeof ctxOrCookie === 'string') {
        this.cookie = new universalCookie(ctxOrCookie as string)
      } else if (ctxOrCookie && typeof ctxOrCookie.req !== 'undefined') {
        this.ctx = ctxOrCookie as NextContext
        this.cookie = new universalCookie(this.ctx.req.headers.cookie)
      } else {
        this.cookie = new universalCookie()
      }
    }
  }

  /**
   * Get value of cookie.
   *
   * @param name  Cookie name.
   * @returns  The cookie value or null if not found.
   */
  public get(name: string): any {
    return this.cookie.get(name)
  }

  /**
   * Set a cookie.
   *
   * @param name  Cookie name
   * @param value  The cookie's value.
   * @param options
   */
  public set(name: string, value: any, options?: CookieSetOptions): void {
    if (this.isServer) {
      this.ctx.res.setHeader(
        'Set-Cookie',
        parser.serialize(
          name,
          value,
          options as parser.CookieSerializeOptions,
        ),
      )
    } else {
      this.cookie.set(name, value, options)
    }
  }
}

export { Cookie }
