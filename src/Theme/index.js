import { createGlobalStyle } from "styled-components";
import darkTheme from './dark';
import lightTheme from './light';

const GlobalStyles = createGlobalStyle`
  body {
    transition: all 0.25s linear;
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }`;


export {
  darkTheme,
  lightTheme
}
export default GlobalStyles;