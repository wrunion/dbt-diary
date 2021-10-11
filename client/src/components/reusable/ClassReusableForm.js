import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 0, text: '0', value: 0 },
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
]

const inputs = [
  { name: 'drop-1', label: 'Test Dropdown 1', type: 'dropdown', required: false, defaultValue: 0 },
  { name: 'drop-2', label: 'Test Dropdown 2', type: 'dropdown', required: false, defaultValue: 0 }
]

export default class ReusableClassForm extends Component {
  state = {}

  setInitialState() {
    const initState = {}
    inputs.forEach(e => initState[e.name] = e.defaultValue  || '')
    this.setState(initState)
  }

  componentDidMount() {
    this.setInitialState(inputs)
    console.log(this.state)
  }

  handleChange = (e, { value }) => {
    console.log(this.state)
    console.log(e.target)
    this.setState({ value })
    console.log(this.state)
  }
  

  render() {
    const { value } = this.state
    const name='abc'
    return (
      <>
        <Dropdown
          onChange={this.handleChange}
          options={options}
          placeholder='Choose an option'
          selection
          value={this.state[this.name]}
          id='abc'
        />
      </>
    )
  }
}