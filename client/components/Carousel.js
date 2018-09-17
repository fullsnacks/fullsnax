import React, {Component} from 'react'
import ImageSlide from './ImageSlide'

const imgUrls = [
  '/carouselPics/snacks1.png',
  '/carouselPics/snacks2.jpg',
  '/carouselPics/snacks3.png',
  '/carouselPics/snacks4.jpg'
]

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImageIndex: 0
    }
  }

  componentDidMount() {
    const switcher = setInterval(() => {
      const currentIdx = this.state.currentImageIndex
      this.setState({
        currentImageIndex: (currentIdx + 1) % imgUrls.length
      })
    }, 2500)
    this.setState({
      switcher
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.switcher)
  }

  render() {
    return (
      <div
        className="carousel"
        style={{display: 'flex', justifyContent: 'center'}}
      >
        <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
      </div>
    )
  }
}

export default Carousel
