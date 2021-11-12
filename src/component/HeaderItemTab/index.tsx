import { useState, useMemo } from 'react';
import { useHistory  } from 'react-router-dom';
import store from '../../redux/store';
import { createSelectPanelAction } from '../../redux/selectPanel/selectPanel_action';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function HeaderItemBar() {
  const [value, setValue] = useState('');
  const history = useHistory();

  // set nav tab
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  };

  // set selectPanel to redux-persist
  useMemo(
    () => {
      store.dispatch(createSelectPanelAction(value))
    },
    [value]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab onClick={() => history.push('/example')} value="example" label="example" />
        <Tab onClick={() => history.push('/singlepredict')} value="singlepredict" label="singlepredict" />
        <Tab onClick={() => history.push('/batchpredict')} value="batchpredict" label="batchpredict" />
      </Tabs>
    </Box>
  );
}