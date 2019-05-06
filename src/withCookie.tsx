/* tslint:disable: variable-name */

import { NextComponentType, NextContext } from 'next'
import * as React from 'react'

import { Cookie } from './Cookie'

export interface WithCookieProps {
  cookie?: Cookie
}

export interface WithCookieContext extends NextContext {
  cookie?: Cookie
}

export function withCookie<Props extends WithCookieProps, InitialProps extends {}>(
  ComposedComponent: NextComponentType<Props, InitialProps>
): NextComponentType<Props, InitialProps> {

  const name: string = ComposedComponent.displayName || ComposedComponent.name

  class WithCookieWrapper extends React.Component<Props> {
    static displayName = `withCookie(${name})`

    static getInitialProps?: (ctx: WithCookieContext) => Promise<InitialProps>

    public render(): JSX.Element {
      const cookie = new Cookie()

      return (
        <ComposedComponent
          cookie={cookie}
          {...this.props as Props} />
      )
    }
  }

  WithCookieWrapper.getInitialProps = async (ctx: WithCookieContext): Promise<InitialProps> => {
    let initialProps = {}

    if (ComposedComponent.getInitialProps) {
      ctx.cookie = new Cookie(ctx)

      initialProps = await ComposedComponent.getInitialProps(ctx)

      if (ctx.cookie) {
        delete ctx.cookie
      }
    }

    return initialProps as InitialProps
  }

  return WithCookieWrapper
}
