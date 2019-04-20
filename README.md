# next-cookie

## Usage

```
import { Cookie, withCookie } from 'next-cookie'

interface State = {
  name: string
}

class IndexPage extends React.Component<{}, State> {

  constructor(props) {
    super(props)

    this.state = {}
  }

  static async getInitialProps(ctx) {
    const cookie = new Cookie(ctx)

    const name = cookie.get('name')

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
