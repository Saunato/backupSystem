import { createContext, useMemo, useState } from 'react';
import Header from './component/Header';
import Routes from './route';
import store from './redux/store';
import { createThemeAction } from './redux/theme/theme_action';
import { createIsLoginAction } from './redux/isLogin/isLogin_actions';

import { lightTheme, darkTheme } from './component/Util/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';


export const ToggleThemeContext = createContext({toggleTheme: () => {}});

function App() {
  const [mode, setMode] = useState(
    store.getState().persistTheme ? (store.getState().persistTheme as any).mode : 'light'
  )
  const [selectPanel, setSelectPanel] = useState(
    store.getState().persistSelectPanel ? (store.getState().persistSelectPanel as any).selectPanel.slice(1,(store.getState().persistSelectPanel as any).selectPanel.length-1) : ''
  )
  const [isLogin, setIsLogin] = useState(
    (store.getState().persistIsLogin as any).mode === 'true' ? true : false
  );

  store.subscribe(() => {
    setIsLogin((store.getState().persistIsLogin as any).mode === 'true' ? true : false)
    setSelectPanel((store.getState().persistSelectPanel as any).selectPanel)
  })

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

  const logout = () => {
    store.dispatch(createIsLoginAction(''))
    setIsLogin(false)
  }

  return (
    <div>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <ThemeProvider theme={theme}>
          {isLogin && <Header logout={logout} selectPanel={selectPanel}/>}
          <Container className="app-container" maxWidth="lg">
            <Routes />
          </Container>
        </ThemeProvider>
      </ToggleThemeContext.Provider>
    </div>
  )
}

export default App;
