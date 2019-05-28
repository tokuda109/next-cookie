/* tslint:disable: variable-name */

import * as parser from 'cookie'
import { NextContext } from 'next'
import universalCookie, { CookieGetOptions, CookieSetOptions } from 'universal-cookie'

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
   * Returns true if the cookie value exists.
   *
   * @param name The name of the cookie.
   * @returns True if it exists, false otherwise.
   */
  public has(name: string): boolean {
    return typeof this.get(name) !== 'undefined'
  }

  /**
   * Get value of cookie.
   *
   * @param name The name of the cookie.
   * @param options `CookieGetOptions` used in `universal-cookie`.
   * @returns The cookie value or null if not found.
   */
  public get(name: string, options?: CookieGetOptions): any {
    return this.cookie.get(name, options)
  }

  /**
   * Get all cookies.
   *
   * @param options `CookieGetOptions` used in `universal-cookie`.
   */
  public getAll(options?: CookieGetOptions): {
    [name: string]: any;
  } {
    return this.cookie.getAll(options)
  }

  /**
   * Set a cookie.
   *
   * @param name The name of the cookie.
   * @param value The value of the cookie.
   * @param options `CookieSetOptions` used in `universal-cookie`.
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
      this.cookie.set(name, value, options as CookieSetOptions)
    }
  }

  /**
   * Remove a cookie by name.
   *
   * @param name The name of the cookie.
   * @param options `CookieSetOptions` used in `universal-cookie`.
   */
  public remove(name: string, options?: CookieSetOptions): void {
    if (!this.has(name)) {
      return
    }

    const opt = Object.assign(
      {
        expires: new Date(),
        path: '/',
      },
      options || {},
    )

    if (this.isServer) {
      this.ctx.res.setHeader(
        'Set-Cookie',
        parser.serialize(
          name,
          '',
          opt as parser.CookieSerializeOptions,
        ),
      )
    } else {
      this.cookie.remove(name, opt as CookieSetOptions)
    }
  }
}

export { Cookie }
