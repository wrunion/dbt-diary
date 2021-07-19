import React from 'react'
import SoundPlayer from './SoundPlayer'

/* Extract resource data for mapping later on */
const RESOURCES = [
  { 
    component: 'SoundPlayer', 
    props: {
      path: 'client/src/assets/malia-yoga.mp3',
      title: 'Guided Breath Meditation by Malia Yoga',
      categories: '#Guided meditation, #Sleep'
    }
  }
]

const MoreResources = () => {

  return ( 
    <>
      <SoundPlayer path='client/src/assets/malia-yoga.mp3' 
        title='Guided Breath Meditation by Malia Yoga' 
        categories='#Guided meditation, #Sleep' />
    </>
  )
}

export default MoreResources