
import { Cookie, withCookie } from 'next-cookie'

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  static async getInitialProps(ctx) {
    const cookie = new Cookie(ctx)

    // cookie.set('test', 'test')

    const name = cookie.get('name')

    let displayName = 'no name'
    if (name) {
      displayName = name
    }

    return { displayName, test: cookie.get('test') }
  }

  render() {
    const { cookie, displayName, test } = this.props
    const { name } = this.state

    return (
      <div>
        <p>Display name: { displayName }, test: { test }</p>

        <input type="text" name="name" onChange={ e => this.setState({ name: e.target.value }) } />
        <a onClick={ () => {
          cookie.set('name', name)
        } }>Store name to cookie</a>
      </div>
    )
  }
}

export default withCookie(IndexPage)
