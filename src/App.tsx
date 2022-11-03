import { createContext, useMemo, useState } from 'react';
import Header from './component/Header';
import Routes from './route';
import store from './redux/store';
import { createThemeAction } from './redux/theme/theme_action';

import { lightTheme, darkTheme } from './component/Util/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';


export const ToggleThemeContext = createContext({toggleTheme: () => {}});

function App() {
  const [mode, setMode] = useState(
    store.getState().persistTheme ? (store.getState().persistTheme as any).mode : 'light'
  )
  // const [isLogin, setIsLogin] = useState(
  //   (store.getState().persistIsLogin as any) === 'true' ? true : false
  // );

  const toggleTheme = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // set theme to redux-persist
  useMemo(
    () => {
      store.dispatch(createThemeAction(mode))
    },
    [mode]
  );

  // toggle -> change theme
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
