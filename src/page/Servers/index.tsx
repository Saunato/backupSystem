// import React from "react";
import { useHistory  } from 'react-router-dom';
import store from '../../redux/store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Servers() {
  const history = useHistory();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');

  return (
    <Box sx={{ p: 3 }}>
      <Typography>Servers</Typography>
    </Box>
  );
}