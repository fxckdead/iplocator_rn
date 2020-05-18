import React from "react";
import Container from './InputContainer.styled';

export default function InputContainer(props) {
  return <Container style={props.style}>{props.children}</Container>;
}
