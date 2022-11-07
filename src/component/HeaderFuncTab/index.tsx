import React, { useContext } from 'react';
import { ToggleThemeContext } from '../../App'
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from '@mui/icons-material/Logout';


export default function HeaderFuncTab(props: {logout: () => void}) {
  
  const theme = useTheme();
  const colorMode = useContext(ToggleThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        // bgcolor: "background.default",
        color: "inherit",
        borderRadius: 1,
        p: 2  // padding
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={props.logout}
        color="inherit"
      >
          <LogoutIcon />
      </IconButton>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleTheme}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};

