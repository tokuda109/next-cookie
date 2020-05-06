# next-cookie

Cookie serializer and deserializer library for [next.js](https://nextjs.org/).

[![npm](https://nodei.co/npm/next-cookie.png?downloads=true&stars=true)](https://nodei.co/npm/next-cookie)

## Installation

```
$ npm install next-cookie
```

## Usage

### HOCs

The cookies are read and write through `ctx.cookie` or `this.props.cookie` as follows:

```tsx
import { Cookie, withCookie } from 'next-cookie'

interface State = {
  displayName: string
}

class IndexPage extends React.Component<{}, State> {

  static async getInitialProps(ctx) {
    const name = ctx.cookie.get('name')

    let displayName
    if (name) {
      displayName = name
    }

    return { displayName }
  }

  render() {
    const { cookie, displayName } = this.props
    const { name } = this.state

    return (
      <div>
        { displayName ? (
        <p>Display name: { displayName }</p>
        ) : (
        <div>
          <input type="text" name="name" onChange={ e => this.setState({ name: e.target.value }) } />
          <a onClick={ () => {
            cookie.set('name', name)
          } }>Store name to cookie</a>
        </div>
        ) }
      </div>
    )
  }
}

export default withCookie(IndexPage)
```

### Hooks

The `useCookie` returns `cookie` instance.

```tsx
import { useCookie } from 'next-cookie'
import React, { useState } from 'react'

export default props => {
  const cookie = useCookie(props.cookie)
  const [name, setName] = useState(cookie.get('name') || '')

  const onSubmit = (e) => {
    e.preventDefault();

    cookie.set('name', name)

    setName('')
  }

  const onChangeInput = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      { cookie.has('name') ? (
      <p>Display name: { cookie.get('name') }</p>
      ) : (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeInput} />
        <button type="submit">Store name to cookie</button>
      </form>
      ) }
    </div>
  )
}

export function getServerSideProps(context) {
  const cookie = useCookie(context)

  cookie.set('getServerSideProps', 'This value is set by getServerSideProps.')

  return {
    props: {
      cookie: context.req.headers.cookie || ''
    }
  }
}
```

## License

`next-cookie` is licensed under MIT License.  
See [LICENSE](https://github.com/tokuda109/next-cookie/blob/master/LICENSE) for more information.
