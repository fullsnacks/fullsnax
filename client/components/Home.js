import React from 'react'
import Carousel from './Carousel'

const tempStyles = {
  textAlign: 'center'
}

const Home = () => {
  return (
    <div style={tempStyles}>
      <h1>Welcome To FullSnacks</h1>
      <Carousel />
    </div>
  )
}

export default Home
