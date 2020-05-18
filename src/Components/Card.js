import React from "react";

import Container from "./Card.styled";

export default function Card(props) {
  return (
    <Container className={props.className} style={props.style}>
      {props.children}
    </Container>
  );
}
