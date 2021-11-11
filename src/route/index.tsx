import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { routeConfig } from '../route/config';
import {IMenu} from '../model/route';

const Router:React.FC = ()=>{
  
  const route = (r:IMenu)=>{
    const Component = r.page as any
    return (
      <Route
        key = {r.key}
        exact
        path = {r.key}
        component = {Component}
      />
    )
  }

  return (
    <Switch>
      {
        routeConfig.map((r: any) => route(r))
      }
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  )
}

export default Router