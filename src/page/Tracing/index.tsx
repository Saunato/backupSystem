// import React from "react";
import { useHistory  } from 'react-router-dom';
import store from '../../redux/store';

export default function Tracing() {
  const history = useHistory();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');
  return (
    <h1>as</h1>
  );
}