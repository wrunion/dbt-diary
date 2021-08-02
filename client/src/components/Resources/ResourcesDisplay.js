import React, { useState } from 'react'
import Page from '../reusable/Page'
import { Header, List, Card, Menu } from 'semantic-ui-react'
import { SKILLS } from './skillData'
import Quotes from './Quotes/Quotes'
import MoreResources from './MoreResources/MoreResources'

// TODO: turn each tab into a Route instead of using state
// to conditionally render content 
const skills = SKILLS;

const mainStyle = {
  background: 'rgba(224, 225, 226, .5)', 
  width: '100%', 
  height: '100%', 
  marginTop: '25px', 
  padding: '15px' 
}

const Week = () => {

  const [activeTab, setActiveTab] = useState('skills')
  const quotes = []
  const links = []

  const CardDescription = skill => (
      <List bulleted>
        {skill && skill.map(e => 
        <List.Item style={{ lineHeight: '1.5em' }}>
        {e}
        </List.Item>)}
      </List>
  )

  const Skill = (props) => {
    const { skill, title } = props;
    return(
      <div style={{ margin: '1em' }}>

        <Card fluid={true}
          header={title}
          meta='Mindfulness module'
          description={CardDescription(skill)}
          style={{ padding: '1em' }}
        />

      </div>
    )
  }

  const SkillCard = (props) => {

    const skill = props.skill
    const { title, content, module: moduleTitle } = skill;
    const keys = Object.keys(skill.content)
    
     return(
       <>
        <Header as='h2' content={title} color='violet' 
          attached='top'
          textAlign='center' 
          />

        <div style={mainStyle}>

        {keys && keys.map(e => 
          <Skill skill={content[e]} title={e} /> 
          )}

      </div>
      </>
    )
  }

  return (

    <Page 
      title='Learn More' color='teal' icon='book'
      id='skills-page'
      >
        <Menu pointing secondary widths={3}>
          <Menu.Item 
            name='Skills'
            active={activeTab === 'skills'}
            onClick={() => setActiveTab('skills')}
          />
          <Menu.Item 
            name='Quotes'
            active={activeTab === 'quotes'}
            onClick={() => setActiveTab('quotes')}
          />
          <Menu.Item 
            name='More Resources'
            active={activeTab === 'more'}
            onClick={() => setActiveTab('more')}
          />
        </Menu>

        {skills && activeTab === 'skills' && skills.map(e => 
          <SkillCard skill={e} /> 
        )}

        {activeTab === 'quotes' && <Quotes />}

        {activeTab === 'more' && <MoreResources />}
        
    </Page>
  )
}

export default Week