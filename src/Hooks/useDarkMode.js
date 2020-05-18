import { useEffect, useState } from 'react';

 const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);
  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
      setMode('dark') :
      localTheme ?
        setTheme(localTheme) :
        setMode('light');
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted]
};

export default useDarkMode;

// https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/
// another approach with context provider https://milddev.com/react/set-up-light-and-dark-theme-in-react/