# next-cookie

:warning: Version 2 of this library will work only with Next.js 9. If you're using Next.js 6-8 you can use previous versions. :warning:

Cookie serializer and deserializer library for [next.js](https://nextjs.org/).

[![npm](https://nodei.co/npm/next-cookie.png?downloads=true&stars=true)](https://nodei.co/npm/next-cookie)

## Installation

```
$ npm install next-cookie
```

## Usage

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

## License

`next-cookie` is licensed under MIT License.  
See [LICENSE](https://github.com/tokuda109/next-cookie/blob/master/LICENSE) for more information.
