import * as React from "react";
import HeaderItemBar from "../HeaderItemTab";
import HeaderFuncTab from "../HeaderFuncTab";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";


export default function HideAppBar(props: {logout: () => void, selectPanel: string}) {
  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar>
          <Toolbar>
            <HeaderItemBar selectPanel={props.selectPanel}/>
            <HeaderFuncTab logout={props.logout}/>
          </Toolbar>
        </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}