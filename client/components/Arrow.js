import React from 'react'

const Arrow = ({direction, clickFunction, glyph}) => (
  <div
    className={`slide-arrow ${direction}`}
    onClick={clickFunction}
    style={{marginTop: '198px'}}
  >
    {glyph}
  </div>
)

export default Arrow
