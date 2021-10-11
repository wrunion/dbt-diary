import React, { useState } from 'react'
// import Dropdown from './FormElements/Dropdown'

import { Segment, Form, Input, Label, Header, Button, Dimmer, Icon, TextArea, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moment from 'moment'

const { Field } = Form

/* TextArea Input */
export const CustomTextArea = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [value, setValue] = useState()

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }

  return (
    <Field key={name}>
      <label htmlFor={name}>
        <Icon name={icon} color={color} /> {label}
      </label>
      <TextArea 
        rows='5'
        name={name}
        value={value}
        onChange={handleChange}
      />
    </Field>
  )
}

/* Text Input */
export const CustomTextInput = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [value, setValue] = useState()

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }

  const CustomLabel = () => (
    <Label basic pointing='right' htmlFor={name} color={color}>
      {label}
    </Label>
  )

  return (
    <Field key={name}>
      <Input  
        name={name} 
        value={value}
        onChange={handleChange}
        label={<CustomLabel />}
      />
    </Field>
  )
}

/* Checkbox Input */
export const CustomCheckboxInput = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [checked, setChecked] = useState()

  const handleChange = e => {
    let isChecked = e.target.checked
    setChecked(isChecked)
    callbackFunction({ value: isChecked, name })
  }

  const CustomLabel = () => (
    <Label basic pointing='left' htmlFor={name} color={color}>
      {label}
    </Label>
  )

  return (
    <Field inline key={name}>
      <input type='checkbox' 
        name={name}
        checked={checked}
        value={checked}
        onChange={handleChange}
      />
    <CustomLabel />
    </Field>
  )
}

/* Default Input */
export const CustomDateInput = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const today = new Date().toISOString().substr(0,10)
  const [value, setValue] = useState(today)

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }

  return (
    <Field key={name}>
      <Input 
        type='date'
        defaultValue={today}
        name={name}
        value={value}
        onChange={handleChange}
        />
    </Field>
  )
}


/* Custom reusable form component.
 * Required props: 
 * inputs: array of objects each describing a single form input
 * success: boolean value that determines the value of "dimmerActive/" 
 * onSubmitCallback: function that is called with form data as an argument on submit.
 * 
 * Additional props for component styling are available and are described in PropTypes
 */

// const CustomForm = (props) => {

//   const { inputs, success, onSubmitCallback, color='grey', title='Journal', subheader='', icon=null } = props

//   const [vals, setVals] = useState({})
//   const [dimmerActive, setDimmerActive] = useState(false)

//   const setInitialState = () => {
//     const initState = {}
//     inputs.forEach(e => initState[e.name] = e.defaultValue  || '')
//     setVals(initState)
//   }

//   useEffect(() => {
//     setInitialState(inputs)
//   }, [inputs])

//   useEffect(() => {
//     setDimmerActive(success)
//     setInitialState(inputs)
//   }, [success])

//   const handleChange = e => {
//     setVals({ ...vals, [e.target.name]: e.target.value })
//   }

//   const handleCheckboxChange = e => {
//     setVals({ ...vals, [e.target.name]: e.target.checked })
//   }

//   // const handleSubmit = event => {
//   //   event.preventDefault()
//   //   // Timestamp entry if date was not entered
//   //   if (!vals.date) { vals.date = moment().format('YYYY-MM-DD') }
//   //   // Pass data up to parent component
//   //   // onSubmitCallback(vals)
//   //   console.log(vals)
//   // }

//   const dropdownCb = ({ value, name }) => {
//     setVals({ ...vals, [name]: value })
//   }


//   return (
//     <>
//     {(vals && Object.keys(vals).length > 0) &&
//     <Dimmable dimmed={dimmerActive} 
//       style={{borderRadius: '5px' }}>

//       <Segment as='section'>
//         <Form onSubmit={(e) => handleSubmit(e)} style={formStyle}>
//           <Header as='h2' color={color} 
//             content={title}
//             style={headerStyle} 
//             subheader={subheader} 
//             icon={icon} 
//             />
          
//           {inputs.map(e => {
//             const { name, label, type } = e
//             if (type === 'textarea') {
//               return(
//                 <Field key={name}>
//                   <label htmlFor={name}>
//                     <Icon name={icon} color={color} /> {label}
//                   </label>
//                   <TextArea 
//                     rows='5'
//                     name={name}
//                     value={vals[name]}
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </Field>
//               )
//             } 
//             if (type === 'dropdown') {
//               return (
//                 <Dropdown 
//                   cbFunction={dropdownCb}
//                   name={name}
//                   label={label}
//                   reset={dimmerActive}
//                 />
//               )
//             }
//             if (type === 'checkbox') {
//               return(
//                 <Field inline key={name}>
//                   <input type='checkbox' 
//                     name={name}
//                     checked={vals[name]}
//                     value={vals[name]}
//                     onChange={(e) => handleCheckboxChange(e)}
//                   />
//                   <Label basic pointing='left' htmlFor={name}>
//                     {label}
//                   </Label>
//                 </Field>
//               )
//             } 
//             if (type === 'number') {
//               return (
//                 <Field inline key={name}>
//                   <Input 
//                     type='number'
//                     min='0' 
//                     max='5' 
//                     placeholder='0'
//                     name={name}
//                     value={vals[e.name]}
//                     onChange={(e) => handleChange(e)}
//                   />
//                   <Label htmlFor={name} color={color} basic pointing='left'>
//                     {label}
//                   </Label>
//                 </Field>
//               )
//             }
//             if (type === 'text') {
//               return (
//                 <Field key={name}>
//                 <Input 
//                   type={type}
//                   name={name}
//                   value={vals[name]}
//                   onChange={(e) => handleChange(e)}
//                   label={
//                     <Label basic pointing='right' htmlFor={name} color={color}>
//                       {label}
//                     </Label>
//                     }
//                   />
//               </Field>
//               )
//             }
//             else {
//               return (
//                 <Field key={name}>
//                 <Input 
//                   type={type}
//                   name={name}
//                   value={vals[name]}
//                   onChange={(e) => handleChange(e)}
//                   />
//               </Field>
//               )
//             }})}
//           <Button type='submit' color={color}>Submit</Button>
//         </Form>
//       </Segment>

//       <Dimmer active={dimmerActive} 
//         onClickOutside={() => setDimmerActive(false)}>
//         <Header as='h2' icon inverted>
//           <Icon name='heart' />
//           Nice work! 
//           <Subheader>Make sure to get some rest today!</Subheader>
//         </Header>
//       </Dimmer>
//     </Dimmable>}
//     </>
//   )
// }

// CustomForm.propTypes = {
//   inputs: PropTypes.array.isRequired,
//   onSubmitCallback: PropTypes.func.isRequired,
//   success: PropTypes.bool,
//   color: PropTypes.string,
//   title: PropTypes.string, 
//   subheader: PropTypes.string
// }

// export default CustomForm