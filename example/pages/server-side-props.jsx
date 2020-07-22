import Head from 'next/head'
import { useCookie, withCookie } from 'next-cookie'
import React from 'react'

class ServerSidePropsPage extends React.Component {
  render() {
    const { cookieString } = this.props

    let text = ""
    if (Object.keys(cookieString).length > 0) {
      text = JSON.stringify(cookieString)
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
    );
  }
}

export function getServerSideProps(context) {
  const cookie = useCookie(context)

  cookie.set('getServerSideProps', 'This value is set by getServerSideProps.')

  return {
    props: {
      cookieString: cookie.getAll()
    }
  }
}

export default withCookie(ServerSidePropsPage)
