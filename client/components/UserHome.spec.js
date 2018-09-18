/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './UserHome'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome user={(firstName = 'Cody')} />)
  })

  xit('renders the name in an h2', () => {
    expect(userHome.find('h2').text()).to.be.equal('Welcome back, Cody!')
  })
})
