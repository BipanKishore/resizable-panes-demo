import React from 'react'

interface ICheckBoxProps {
    checked: boolean,
    id: string,
    onChange: any,
    label: string
}

export const CheckBox = (props: ICheckBoxProps) => {
  const {id, checked, onChange, label} = props

  return (
    <label className='m-r-10' htmlFor={id} key={id}>
      <input
        checked={checked}
        id={id}
        name={id}
        type="checkbox"
        onChange={onChange}
      />
      <span className='m-l-5' >
        {label}
      </span>

    </label>
  )
}
