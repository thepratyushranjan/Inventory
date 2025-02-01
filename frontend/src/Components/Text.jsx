import React from 'react'

const Text = ({text = "Data", fontSize , fontWeight = 300 , width = "15%", color = "black"} ) => {
  return (
    <span style={{fontSize, fontWeight, width, color}}>{text}</span>
  )
}

export default Text