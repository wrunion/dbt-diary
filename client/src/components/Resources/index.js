import React from 'react'
import Page from '../reusable/Page'
import { Segment, Header } from 'semantic-ui-react'
import { SKILLS, WEEKS } from './skillData'

const skills = SKILLS;

const Week = () => {

  console.log(skills)

  const SkillCard = (props) => {

    const skill = props.skill
    const { title, content, module: moduleTitle } = skill;
    console.log(title, content, moduleTitle)
    
     return(
      <Segment>
        {/* {title} */}
        abc
      </Segment>
    )
  }

  return(
    <Page 
      title='Skills' color='grey' icon='book'
      subtitle='Learn more about each DBT skill'>

      {skills.map(e => <SkillCard skill={e} /> )}
      
    </Page>
  )
}

export default Week;
