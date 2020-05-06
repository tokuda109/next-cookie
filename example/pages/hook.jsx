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
