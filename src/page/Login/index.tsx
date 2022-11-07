import { useState, useMemo } from 'react';
import { Modal } from 'antd';
import store from '../../redux/store';
import { createIsLoginAction } from '../../redux/isLogin/isLogin_actions';
import { useHistory } from 'react-router-dom';
import './style.scss';


export default function Home() {
  const [isLogin, setIsLogin] = useState(
    (store.getState().persistIsLogin as any).mode === 'true' ? true : false
  );
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState({
    signInName: false,
    signInPassword: false,
    signOnName: false,
    signOnPassword: false,
    signOnRePassword: false,
  })
  const history = useHistory();

  useMemo(
    () => {
      store.dispatch(createIsLoginAction(isLogin + ''))
      isLogin && history.push('/example')
    },
    [isLogin, history]
  );

  const handleOk = () => {
    setIsLogin(true);
  };

  return (
    <div>
      <Modal open={!isLogin} closable={false} footer={null} centered={true} bodyStyle={{padding: "0px"}}>
        <div id="login-box" className={"container " + (isSignUpActive ? "right-panel-active" : "")}>
          <div className="form-container sign-up-container">
            <form>
              <h1>注册</h1>
              <div className="txtb">
                <input type="text" className={isInputFocus.signOnName ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({...isInputFocus,signOnName: true,})
                  }
                } onBlur={
                  (e) => {
                    if(e.target.value === ""){
                      setIsInputFocus({...isInputFocus,signOnName: false,})
                    }
                  }
                }/>
                <span data-placeholder="Useranme" ></span>
              </div>
              <div className="txtb">
                <input type="password" className={isInputFocus.signOnRePassword ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({...isInputFocus,signOnRePassword: true,})
                  }
                } onBlur={
                  (e) => {
                    if(e.target.value === ""){
                      setIsInputFocus({...isInputFocus,signOnRePassword: false,})
                    }
                  }
                }/>
                <span data-placeholder="Password" ></span>
              </div>
              <div className="txtb">
                <input type="password" className={isInputFocus.signOnPassword ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({...isInputFocus,signOnPassword: true,})
                  }
                } onBlur={
                  (e) => {
                    if(e.target.value === ""){
                      setIsInputFocus({...isInputFocus,signOnPassword: false,})
                    }
                  }
                }/>
                <span data-placeholder="Confirm Password" ></span>
              </div>
              <button>注册</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>登录</h1>
              <div className="txtb">
                <input type="text" className={isInputFocus.signInName ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({...isInputFocus,signInName: true,})
                  }
                } onBlur={
                  (e) => {
                    if(e.target.value === ""){
                      setIsInputFocus({...isInputFocus,signInName: false,})
                    }
                  }
                }/>
                <span data-placeholder="Useranme" ></span>

              </div>
              <div className="txtb">
                <input type="password" className={isInputFocus.signInPassword ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({...isInputFocus,signInPassword: true,})
                  }
                } onBlur={
                  (e) => {
                    if(e.target.value === ""){
                      setIsInputFocus({...isInputFocus,signInPassword: false,})
                    }
                  }
                }/>
                <span data-placeholder="Password"></span>

              </div>
              <button onClick={handleOk}>登录</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 style={{color: '#fff'}}>已有账号？</h1>
                <p>请使用您的账号进行登录</p>
                <button className="ghost" id="signIn" onClick={() => {
                  setIsSignUpActive(false)
                }}>登录</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 style={{color: '#fff'}}>没有账号?</h1>
                <p>立即注册加入我们，和我们一起开始旅程吧</p>
                <button className="ghost " id="signUp" onClick={() => {
                  setIsSignUpActive(true)
                }}>注册</button>
              </div>
            </div>
          </div>
        </div>

      </Modal>
    </div>
  );
}