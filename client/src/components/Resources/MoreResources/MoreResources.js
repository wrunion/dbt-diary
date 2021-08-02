import React from 'react'
import SoundPlayer from './SoundPlayer'

/* Path and metadata for each sound file goes here */
/* It's mapped down below into SoundPlayer components */
const SOUND_PLAYER_INSTANCES = [
  {
    path: 'client/src/assets/malia-yoga.mp3',
    title: 'Guided Breath Meditation by Malia Yoga',
    categories: '#Guided meditation, #Sleep'
  },
  {
    path: 'client/src/assets/mushroom-meditation-music.mp3',
    title: 'Music for Meditation: Mushrooms in the Forest',
    categories: '#meditation, #deities, #faith, #devotion, #forest meditation, #music, #mindfulness, #nature sounds'
  },
  {
    path: 'client/src/assets/celtic-forest-meditation-music.mp3',
    title: 'Music for Meditation: Celtic Meditation',
    categories: '#meditation, #deities, #faith, #devotion, #celtic, #music, #forest meditation, #mindfulness, #nature sounds'
  },
  {
    path: 'client/src/assets/meditation-1.m4a',
    title: 'Meditation by Henry: Listen to your gut',
    categories: '#hypnosis #relaxation #digestion'
  },
  {
    path: 'client/src/assets/meditation-2.m4a',
    title: `Meditation by Henry: It's okay to say no`,
    categories: '#hypnosis #self-love #boundaries'
  }
]

const MoreResources = () => {

  return ( 
    <div className='SoundPlayerPage'>
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