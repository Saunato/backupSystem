import React, { useContext } from 'react';
import { ToggleThemeContext } from '../../App'
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from "@mui/icons-material/Brightness7";


const HeaderFuncTab: React.FC = () => {
  
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

export default HeaderFuncTab;
