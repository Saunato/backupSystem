import { createContext, useMemo, useState } from 'react';
import Header from './component/Header';
// import SwipeableViews from 'react-swipeable-views';
import Routes from './route';

import { lightTheme, darkTheme } from './component/Util/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';


export const ToggleThemeContext = createContext({toggleTheme: () => {}});

function App() {
  const [mode, setMode] = useState('light');

  const toggleTheme = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () => mode === 'light' ? lightTheme : darkTheme,
    [mode]
  );

  return (
    <div>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <ThemeProvider theme={theme}>
          <Header/>
          <Container className="app-container" maxWidth="lg">
            <Routes />
          </Container>
        </ThemeProvider>
      </ToggleThemeContext.Provider>
    </div>
  )
}

export default App;
