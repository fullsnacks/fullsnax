import React, {Component} from 'react'
import Arrow from './Arrow'
import ImageSlide from './ImageSlide'

const imgUrls = [
  '/carouselPics/snacks1.jpg',
  '/carouselPics/snacks2.jpg',
  '/carouselPics/snacks3.jpeg',
  '/carouselPics/snacks4.jpg'
]

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImageIndex: 0
    }

    this.nextSlide = this.nextSlide.bind(this)
    this.previousSlide = this.previousSlide.bind(this)
  }

  previousSlide() {
    const lastIndex = imgUrls.length - 1
    const {currentImageIndex} = this.state
    const shouldResetIndex = currentImageIndex === 0
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1
    this.setState({
      currentImageIndex: index
    })
  }

  nextSlide() {
    const lastIndex = imgUrls.length - 1
    const {currentImageIndex} = this.state
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentImageIndex + 1
    this.setState({
      currentImageIndex: index
    })
  }

  render() {
    return (
      <div
        className="carousel"
        style={{display: 'flex', justifyContent: 'center'}}
      >
        <Arrow
          direction="left"
          clickFunction={this.previousSlide}
          glyph="&#9664;"
        />
        <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
        <Arrow
          direction="right"
          clickFunction={this.nextSlide}
          glyph="&#9654;"
        />
      </div>
    )
  }
}

export default Carousel
