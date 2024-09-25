import React from 'react'
import './formInput.css'
const FormInfo = (props) => {
  const { onChange, id, ...inputProp } = props
  return (
    <div className='formInput'>
      <input {...inputProp} onChange={onChange} required />
    </div>
  )
}

export default FormInfo