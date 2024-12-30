import React from 'react'

const Text = ({text = "Data", fontSize , fontWeight = 300 , width = "15%", color = "black"} ) => {
  return (
    <span style={{fontSize, fontWeight, width, color}}>{text}</span>
  )
}

/*p {
  font-size: clamp(1vw, 1rem, 2vw);
}3 */

export default Text