import {SELECTPANEL} from '../constant'

const initMode: object = {
  selectPanel: (
    window.localStorage.getItem('persist:persistSelectPanel') && JSON.parse(window.localStorage.getItem('persist:persistSelectPanel') as any).selectPanel
    ? JSON.parse(window.localStorage.getItem('persist:persistSelectPanel') as any).selectPanel
    : 'login'
  )
}

export const selectPanelReducer = (preState=initMode, action:any)=>{
  const {type, data} = action
  switch (type) {
    case SELECTPANEL:
      return { selectPanel: data }
    default:
      return preState
  }
}