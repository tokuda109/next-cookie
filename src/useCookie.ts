import { NextPageContext } from 'next'
import { Cookie } from './Cookie'

export function useCookie(ctxOrCookie?: NextPageContext | string): Cookie {
  return new Cookie(ctxOrCookie)
}
