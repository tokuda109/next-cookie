/* tslint:disable: variable-name */

import * as parser from 'cookie'
import { NextContext } from 'next'
import universalCookie, { CookieGetOptions, CookieSetOptions } from 'universal-cookie'

const SET_COOKIE_HEADER = 'Set-Cookie'

class Cookie {

  ctx?: NextContext

  cookie: universalCookie

  isServer: boolean

  constructor(ctxOrCookie?: NextContext | string) {
    this.isServer = typeof window === 'undefined'

    if (this.isServer) {
      if (typeof ctxOrCookie === 'string') {
        this.cookie = new universalCookie(ctxOrCookie as string)
      } else if (ctxOrCookie && typeof ctxOrCookie.req !== 'undefined') {
        this.ctx = ctxOrCookie as NextContext
        this.cookie = new universalCookie(this.ctx.req.headers.cookie)
      } else {
        this.cookie = new universalCookie()
      }
    } else {
      let cookieString
      if (typeof ctxOrCookie === 'string') {
        cookieString = ctxOrCookie
      }

      this.cookie = new universalCookie(cookieString)
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
  public get<T>(name: string, options?: CookieGetOptions): T {
    return this.cookie.get(name, options)
  }

  /**
   * Get all cookies.
   *
   * @param options `CookieGetOptions` used in `universal-cookie`.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public getAll(options?: CookieGetOptions): {
    [name: string]: any,
  } {
    return this.cookie.getAll(options)
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  /**
   * Set a cookie.
   *
   * @param name The name of the cookie.
   * @param value The value of the cookie.
   * @param options `CookieSetOptions` used in `universal-cookie`.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public set(name: string, value: any, options?: CookieSetOptions): void {
    if (this.isServer && this.ctx) {
      this.ctx.res.setHeader(
        SET_COOKIE_HEADER,
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
  /* eslint-enable @typescript-eslint/no-explicit-any */

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

    if (this.isServer && this.ctx) {
      this.ctx.res.setHeader(
        SET_COOKIE_HEADER,
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
