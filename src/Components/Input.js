import React from 'react'
import InputStyled from './Input.styled';

export default function Input(props) {
  return (
    <InputStyled type="text" {...props} placeholder="IP Address"/>
  )
}
