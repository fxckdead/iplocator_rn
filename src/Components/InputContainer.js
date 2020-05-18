import React from "react";
import Container from './InputContainer.styled';

export default function InputContainer(props) {
  return <Container>{props.children}</Container>;
}
