import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Alert({ message }) {
  const themeContext = useContext(ThemeContext);

  return (
    <div className="alert alert-danger" role="alert" style={{ marginTop: 14 }}>
      <strong>
        <FontAwesomeIcon icon={faExclamationTriangle} /> Se produjo un error:{" "}
      </strong>{" "}
      {message}
    </div>
  );
}
