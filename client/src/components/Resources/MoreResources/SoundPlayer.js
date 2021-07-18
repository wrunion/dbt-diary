import React, { useEffect, useState } from 'react';
import { Header, Button, Segment  } from 'semantic-ui-react'

const SoundPlayer = (props) => {
  const { path, title, categories } = props

  const audioTune = new Audio(path);

  const [playInLoop, setPlayInLoop] = useState(false);
 
  // load audio file on component load
  useEffect(() => {
    audioTune.load();
  }, [])
 
  // set the loop of audio tune
  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop])
 
  const playSound = () => {
    audioTune.play();
  }

  const pauseSound = () => {
    audioTune.pause();
  }
 
  const stopSound = () => {
    audioTune.pause();
    audioTune.currentTime = 0;
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const headerStyle = {
    marginBottom: '1em',
    marginTop: '1.5em'
  }

  const buttonStyle = {
    marginRight: '1em',
    borderRadius: 0
  }

  const loopStyle =  { 
    textAlign: 'center', 
    marginTop: '1.5em',
    marginBottom: '.5em' 
  }
  
  return (
    <>
      <Segment as='section' style={containerStyle}>
        
        <Header as='h3' textAlign='center' color='blue' style={headerStyle}
          content={title} 
          subheader={categories}
        />
        
        <div>
          <Button icon='play' onClick={playSound} style={buttonStyle} />
          <Button icon='pause' onClick={pauseSound} style={buttonStyle} />
          <Button icon='stop' onClick={stopSound} style={buttonStyle} />

          <div style={loopStyle}>
            <label>
            <input type="checkbox" 
              checked={playInLoop} 
              onChange={e => setPlayInLoop(e.target.checked)} 
             />  
            &nbsp; Loop</label>
          </div>
        </div>

      </Segment>
    </>
  );
}

export default SoundPlayer;