// import React from "react";
import { useEffect } from 'react'
import { useHistory  } from 'react-router-dom';
import store from '../../redux/store';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getServers } from '../../services/api';


export default function Servers() {
  const history = useHistory();
  (store.getState().persistIsLogin as any).mode !== 'true' && history.replace('/');

  useEffect(() => {
    getServers({
      pageNo: 1,
      pageSize: 10
    }).then((res)=>{
      console.log(res)
    })
  }, [])
  

  return (
    <Box sx={{ p: 3 }}>
      <Typography>Servers</Typography>
    </Box>
  );
}