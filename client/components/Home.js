import React from 'react'
import Carousel from './Carousel'

const tempStyles = {
  textAlign: 'center'
}

const logoStyle = {
  fontFamily: 'Luckiest Guy',
  fontSize: '4em',
  textShadow: '2px 2px black',
  color: 'orange'
}

const Home = () => {
  return (
    <div style={tempStyles}>
      <h2>Welcome To</h2>
      <h1 style={logoStyle}>FULLSNAXX</h1>
      <Carousel />
    </div>
  )
}

export default Home
