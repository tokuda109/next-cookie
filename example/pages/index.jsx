import Head from 'next/head'
import { withCookie } from 'next-cookie'

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  static async getInitialProps(ctx) {
    ctx.cookie.set('getInitialProps', 'This value is set by getInitialProps.')

    return {}
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    const { cookie } = this.props
    const { storeKey, storeVal, removeKey } = this.state

    const all = cookie.getAll()

    let text = ""
    if (Object.keys(all).length > 0) {
      text = JSON.stringify(all)
    }

    return (
      <div className="container">
        <Head>
          <link rel="stylesheet" href="/static/app.css" />
        </Head>

        <section className="section">
          <p className="section__text">Store value by key.</p>

          <input
            type="text"
            name="key"
            placeholder="Cookie key"
            ref="storeKeyInput"
            onChange={ e => this.setState({ storeKey: e.target.value }) } />
          <input
            type="text"
            name="val"
            placeholder="Cookie value"
            ref="storeValInput"
            onChange={ e => this.setState({ storeVal: e.target.value }) } />

          <button onClick={ () => {
            if (storeKey && storeVal) {
              cookie.set(storeKey, storeVal)

              this.refs.storeKeyInput.value = ""
              this.refs.storeValInput.value = ""

              this.forceUpdate()
            }
          } }>Store</button>
        </section>

        <section className="section">
          <p className="section__text">Delete cookie by key.</p>

          <input
            type="text"
            name="key"
            placeholder="Cookie key"
            ref="removeKeyInput"
            onChange={ e => this.setState({ removeKey: e.target.value }) } />

          <button onClick={ () => {
            if (removeKey) {
              cookie.remove(removeKey)

              this.refs.removeKeyInput.value = ""

              this.forceUpdate()
            }
          } }>Delete</button>
        </section>

        <section className="section">
          <p className="section__text">Cookie result:</p>
          <textarea value={text} rows={10} readOnly onChange={() => {}}></textarea>
        </section>
      </div>
    )
  }
}

export default withCookie(IndexPage)
