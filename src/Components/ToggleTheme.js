import React from "react";
import { func, string } from "prop-types";

import { ReactComponent as MoonIcon } from "../Assets/Images/moon.svg";
import { ReactComponent as SunIcon } from "../Assets/Images/sun.svg";
import Container from './ToggleTheme.styled';

const ToggleTheme = ({ onClick, theme }) => {
  const isLight = theme === 'light';
  return (
    <Container onClick={onClick} lightTheme={isLight}>
      <SunIcon />
      <MoonIcon />
    </Container>
  );
}

ToggleTheme.propTypes = {
  theme: string.isRequired,
  onClick: func.isRequired,
};

export default ToggleTheme;
