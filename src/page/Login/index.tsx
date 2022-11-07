import { useState, useMemo } from 'react';
import { Modal } from 'antd';
import store from '../../redux/store';
import { createIsLoginAction } from '../../redux/isLogin/isLogin_actions';
import { useHistory  } from 'react-router-dom';


export default function Home() {
  const [isLogin, setIsLogin] = useState(
    (store.getState().persistIsLogin as any).mode === 'true' ? true : false
  );
  const history = useHistory();

  useMemo(
    () => {
      store.dispatch(createIsLoginAction(isLogin + ''))
      let lastRoute = store.getState().persistSelectPanel ? (store.getState().persistSelectPanel as any).selectPanel : ''
      // console.log('/' + (lastRoute.length ? lastRoute : 'servers'))
      isLogin && history.push('/' + (lastRoute.length ? lastRoute : 'servers'))
    },
    [isLogin, history]
  );

  const handleOk = () => {
    setIsLogin(true);
  };

  return (
    <>
      <Modal open={!isLogin} closable={false} footer={null} centered={true}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <button onClick={handleOk}>登录</button>
      </Modal>
    </>
  );
}