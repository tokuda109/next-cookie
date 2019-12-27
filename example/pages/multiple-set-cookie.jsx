import Head from 'next/head'
import { withCookie } from 'next-cookie'

class MultipleSetCookiePage extends React.Component {

  static async getInitialProps(ctx) {
    ctx.cookie.set('first_cookie', 'value1', {
      path: '/',
      maxAge: 3600 * 24 * 30
    })
    ctx.cookie.set('second_cookie', 'value2', {
      path: '/',
      maxAge: 3600 * 24 * 30
    })

    return {}
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    const { cookie } = this.props

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
          <p className="section__text">Cookie result:</p>
          <textarea value={text} rows={10} readOnly onChange={() => {}}></textarea>
        </section>
      </div>
    )
  }
}

export default withCookie(MultipleSetCookiePage)
