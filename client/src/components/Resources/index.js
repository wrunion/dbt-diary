import React from 'react'
import Page from '../reusable/Page'
import { Segment, Header, List, Card } from 'semantic-ui-react'
import { SKILLS } from './skillData'

const skills = SKILLS;

const Week = () => {

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
    console.log(props)
    return(
      <div style={{ margin: '1em' }}>

        <Card fluid
          header={title}
          meta='Mindfulness module'
          description={CardDescription(skill)}
          style={{ padding: '1em' }}
        />

      </div>

      // <Segment style={{ padding: '2em', background: 'rgba(224, 225, 226, .35)'}}>
      //   <Header as='h3' content={title} color='grey' />
      //   <List bulleted>
      //     {skill && skill.map(e => 
      //     <List.Item style={{ lineHeight: '1.5em' }}>
      //     {e}
      //     </List.Item>)}
      //   </List>
      // </Segment>
    )
  }

  const SkillCard = (props) => {

    const skill = props.skill
    const { title, content, module: moduleTitle } = skill;
    const keys = Object.keys(skill.content)
    
     return(
       <>
        <Header as='h2' content={title} color='violet' />

       
      <div style={{ background: 'rgba(224, 225, 226, .5)', width: '100%', height: '100%', marginTop: '25px', padding: '15px' }}>

        {keys && keys.map(e => 
          <Skill skill={content[e]} title={e} /> 
          )}

      </div>
      </>
    )
  }

  return(

    <Page 
      title='Skills' color='grey' icon='book'
      subtitle='Learn more about each DBT skill'
      id='skills-page'>

      {skills.map(e => <SkillCard skill={e} /> )}

    </Page>
  )
}

export default Week;
