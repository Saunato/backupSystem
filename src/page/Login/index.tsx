import { useState, useMemo, useRef, MutableRefObject } from 'react';
import { Modal, message } from 'antd';
import store from '../../redux/store';
import { createIsLoginAction } from '../../redux/isLogin/isLogin_actions';
import { useHistory } from 'react-router-dom';
import { login, signOn } from '../../services/api';
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
  const signInName: MutableRefObject<any> = useRef(null)
  const signInPassword: MutableRefObject<any> = useRef(null)
  const signOnName: MutableRefObject<any> = useRef(null)
  const signOnPassword: MutableRefObject<any> = useRef(null)
  const signOnRePassword: MutableRefObject<any> = useRef(null)
  const history = useHistory();

  useMemo(
    () => {
      store.dispatch(createIsLoginAction(isLogin + ''))
      // let lastRoute = store.getState().persistSelectPanel ? (store.getState().persistSelectPanel as any).selectPanel : ''
      isLogin && history.push('/servers')
    },
    [isLogin, history]
  );

  const handleSignInOk = (e: any) => {
    e.preventDefault()
    login({
      name: signInName.current.value,
      password: signInPassword.current.value
    }).then((res) => {
      const { status } = res
      if(status === 0){
        setIsLogin(true);
      }
      if(status === 1){
        message.error({
          style: {
            marginTop: '100px'
          },
          content: '账号或密码错误'
        });
      }
    }).catch((err) => {
      message.error({
        style: {
          marginTop: '100px'
        },
        content: err
      });
    })
  };

  const handleSignOnOk = (e: any) => {
    e.preventDefault()
    if(signOnPassword.current.value !== signOnRePassword.current.value){
      message.error({
        style: {
          marginTop: '100px'
        },
        content: "两次密码不一致"
      });
    }else{
      signOn({
        name: signOnName.current.value,
        password: signOnPassword.current.value
      }).then((res) => {
        const { status } = res
        if(status === 0){
          message.success({
            style: {
              marginTop: '100px'
            },
            content: '注册成功'
          });
          setIsSignUpActive(false)
        }
        if(status === 1){
          message.error({
            style: {
              marginTop: '100px'
            },
            content: '注册失败'
          });
        }
      }).catch((err) => {
        message.error({
          style: {
            marginTop: '100px'
          },
          content: err
        });
      })
    }
  }

  return (
    <div>
      <Modal open={!isLogin} closable={false} footer={null} centered={true} bodyStyle={{ padding: "0px" }}>
        <div id="login-box" className={"container " + (isSignUpActive ? "right-panel-active" : "")}>
          <div className="form-container sign-up-container">
            <form>
              <h1>注册</h1>
              <div className="txtb">
                <input ref={signOnName} type="text" className={isInputFocus.signOnName ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({ ...isInputFocus, signOnName: true, })
                  }
                } onBlur={
                  (e) => {
                    if (e.target.value === "") {
                      setIsInputFocus({ ...isInputFocus, signOnName: false, })
                    }
                  }
                } />
                <span data-placeholder="Useranme" ></span>
              </div>
              <div className="txtb">
                <input ref={signOnPassword} type="password" className={isInputFocus.signOnRePassword ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({ ...isInputFocus, signOnRePassword: true, })
                  }
                } onBlur={
                  (e) => {
                    if (e.target.value === "") {
                      setIsInputFocus({ ...isInputFocus, signOnRePassword: false, })
                    }
                  }
                } />
                <span data-placeholder="Password" ></span>
              </div>
              <div className="txtb">
                <input ref={signOnRePassword} type="password" className={isInputFocus.signOnPassword ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({ ...isInputFocus, signOnPassword: true, })
                  }
                } onBlur={
                  (e) => {
                    if (e.target.value === "") {
                      setIsInputFocus({ ...isInputFocus, signOnPassword: false, })
                    }
                  }
                } />
                <span data-placeholder="Confirm Password" ></span>
              </div>
              <button onClick={handleSignOnOk}>注册</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>登录</h1>
              <div className="txtb">
                <input ref={signInName} type="text" className={isInputFocus.signInName ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({ ...isInputFocus, signInName: true, })
                  }
                } onBlur={
                  (e) => {
                    if (e.target.value === "") {
                      setIsInputFocus({ ...isInputFocus, signInName: false, })
                    }
                  }
                } />
                <span data-placeholder="Useranme" ></span>

              </div>
              <div className="txtb">
                <input ref={signInPassword} type="password" className={isInputFocus.signInPassword ? "focus" : ''} onFocus={
                  () => {
                    setIsInputFocus({ ...isInputFocus, signInPassword: true, })
                  }
                } onBlur={
                  (e) => {
                    if (e.target.value === "") {
                      setIsInputFocus({ ...isInputFocus, signInPassword: false, })
                    }
                  }
                } />
                <span data-placeholder="Password"></span>

              </div>
              <button onClick={handleSignInOk}>登录</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 style={{ color: '#fff' }}>已有账号？</h1>
                <p>请使用您的账号进行登录</p>
                <button className="ghost" id="signIn" onClick={() => {
                  setIsSignUpActive(false)
                }}>登录</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 style={{ color: '#fff' }}>没有账号?</h1>
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