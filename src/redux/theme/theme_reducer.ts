import {THEME} from '../constant'

const initMode: object = {
  mode: (
    window.localStorage.getItem('persist:persistTheme') && JSON.parse(window.localStorage.getItem('persist:persistTheme') as any).mode == '"dark"'
    ? 'dark'
    : 'light'
  )
}

export const themeReducer = (preState=initMode, action:any)=>{
  const {type, data} = action
  switch (type) {
    case THEME:
      return { mode: data }
    default:
      return preState
  }
}