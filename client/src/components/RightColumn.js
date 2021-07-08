import React from 'react'
import { ReactComponent as MoonPhases } from './../assets/moon-phase-vert-cropped.svg'

const svgStyle = {
  width: '40px',
  color: 'grey'
  // height: '500px'
}

const containerStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '35px'
}

const RightColumn = () => {

  return(
    <div style={containerStyle}>
      <MoonPhases style={svgStyle}
        title='Black and white illustration of the 7 phases of the moon' />
    </div>

  )
}

export default RightColumn;