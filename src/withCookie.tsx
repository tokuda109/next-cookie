/* tslint:disable: variable-name */

import hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'

import { Cookie } from './Cookie'

export function withCookie<T extends {}>(ComposedComponent: React.ComponentType<T>) {
  return hoistNonReactStatics(
    class WithCookieWrapper extends React.Component {
      public render(): JSX.Element {
        const cookie = new Cookie()

        return (
          <ComposedComponent
            {...this.props as T}
            cookie={cookie} />
        )
      }
    },
    ComposedComponent,
  )
}
