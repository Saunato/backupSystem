/*
  该文件专门用来暴露一个store对象，整个应用只有一个store对象
*/

// 引入创建Store的对象
import {createStore, combineReducers} from 'redux';

// 引入 redux-persist
import { persistStore } from 'redux-persist';
import { persist } from './reduxPersist';

// 引入 自定义reducer
import { themeReducer } from './theme/theme_reducer';
import { selectPanelReducer } from './selectPanel/selectPanel_reducer';
import { isLoginReducer } from './isLogin/isLogin_reducer';

// 引入 自定义key (localstorage index)
import { themeConfig, selectPanelConfig, isLoginConfig } from './constant'

const appReducer = combineReducers({
  persistTheme: persist(themeConfig, themeReducer),
  persistSelectPanel: persist(selectPanelConfig, selectPanelReducer),
  persistIsLogin: persist(isLoginConfig, isLoginReducer)
})

const store =  createStore(
  appReducer, 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store)

export default store