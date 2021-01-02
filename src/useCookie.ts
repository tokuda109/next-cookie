import { NextPageContext, GetServerSidePropsContext } from 'next'
import { Cookie } from './Cookie'

export function useCookie(ctxOrCookie?: NextPageContext | GetServerSidePropsContext | string): Cookie {
  return new Cookie(ctxOrCookie)
}
