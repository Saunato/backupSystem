import * as React from "react";
import HeaderItemBar from "../HeaderItemTab";
import HeaderFuncTab from "../HeaderFuncTab";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";


export default function HideAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar>
          <Toolbar>
            <HeaderItemBar />
            <HeaderFuncTab />
          </Toolbar>
        </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}