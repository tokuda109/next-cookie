/* tslint:disable */

import { expect } from 'chai'
import { configure, mount } from 'enzyme'
import { NextContext } from 'next'
import * as React from 'react'

import { WithCookieProps, withCookie } from '../src/withCookie'

const Adapter: any = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

class TestComponent extends React.Component<WithCookieProps> {

  render() {
    const { cookie } = this.props

    return (
      <React.Fragment>
        <p>{ cookie.get('test') }</p>
        <a onClick={ () => {
          cookie.set('test', 'value')
        } }>Click</a>
      </React.Fragment>
    )
  }
}

describe('withCookie.tsx', () => {

  it('works in the render method', () => {
    const Component = withCookie(TestComponent)

    let wrapper = mount(<Component />)

    expect(wrapper.find(TestComponent).length).to.eql(1)
    expect(wrapper.find('p').text()).to.eql('')

    wrapper.find('a').simulate('click')

    wrapper = mount(<Component />)

    expect(wrapper.find(TestComponent).length).to.eql(1)
    expect(wrapper.find('p').text()).to.eql('value')
  })
})
