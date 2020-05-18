import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Container from './ButtonLoader.styled';

export default function ButtonLoader({ disabled, onClick, isLoading }) {
  return (
    <Container
      className={"btn btn-primary"}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin"/> : "Buscar"}
    </Container>
  );
}
