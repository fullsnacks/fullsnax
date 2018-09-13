import React from 'react'

const imgStyle = {
  height: '400px',
  width: '400px',
  objectFit: 'contain'
}

const ImageSlide = ({url}) => {
  return (
    <div className="image-slide">
      <img src={url} alt="oops" style={imgStyle} />
    </div>
  )
}

export default ImageSlide
