import React from 'react'
import SoundPlayer from './SoundPlayer'
import { SOUND_PLAYER_INSTANCES, I_FRAME_INSTANCES } from './../../../data/resources'

const iFrameStyle = {
  display: 'flex', 
  justifyContent: 'center', 
  border: '1px lightgrey solid', 
  padding: '30px 20px', 
  borderRadius: '7px' 
}

const YoutubeIFrame = ({ url, title }) => (
  <section style={iFrameStyle}>
    <iframe width='775' height='450' 
      src={url}
      title={title} 
      frameBorder='0' 
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
      allowFullScreen>
    </iframe>
  </section>
)

const MoreResources = () => {

  return ( 
    <div className='SoundPlayerPage'>
      
      {I_FRAME_INSTANCES.map((e, i) => 
        <YoutubeIFrame 
          key={i} 
          url={e.url} 
          title={e.title}
        /> 
      )}

      {SOUND_PLAYER_INSTANCES.map((e, i) => 
        <SoundPlayer 
          key={i} 
          path={e.path}
          title={e.title}
          categories={e.categories} />
        )
      }
    </div>
  )
}

export default MoreResources