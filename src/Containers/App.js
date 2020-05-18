import React from "react";
import "./App.scss";

import useDarkMode from "../Hooks/useDarkMode";
import { ThemeProvider } from "styled-components";
import GlobalStyles, { lightTheme, darkTheme } from "../Theme/";

import ToggleTheme from '../Components/ToggleTheme';

import Home from './Home';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <div className="container">
        <Home />
        <ToggleTheme onClick={() => toggleTheme()} theme={theme}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
