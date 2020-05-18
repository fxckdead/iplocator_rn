import React from 'react'
import InputStyled from './Input.styled';

export default function Input(props) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const { onEnter } = props;
      onEnter && onEnter(e.target.value);
    }
  };

  return (
    <InputStyled type="text" {...props} placeholder="IP Address" onKeyPress={handleKeyPress} style={{color: !props.isValid? 'red' : "inherit"}}/>
  )
}
