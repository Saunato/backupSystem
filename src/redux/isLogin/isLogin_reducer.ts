import {ISLOGIN} from '../constant'

const initMode: object = {
  mode: (
    window.localStorage.getItem('persist:persistIsLogin') && JSON.parse(window.localStorage.getItem('persist:persistIsLogin') as any).mode === '"true"'
    ? 'true'
    : 'false'
  )
}

export const isLoginReducer = (preState=initMode, action:any)=>{
  const {type, data} = action
  switch (type) {
    case ISLOGIN:
      return { mode: data }
    default:
      return preState
  }
}