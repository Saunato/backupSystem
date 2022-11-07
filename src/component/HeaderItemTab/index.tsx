import { useState, useMemo, useEffect } from 'react';
import { useHistory  } from 'react-router-dom';
import store from '../../redux/store';
import { createSelectPanelAction } from '../../redux/selectPanel/selectPanel_action';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function HeaderItemBar(props: {selectPanel: string}) {
  const [value, setValue] = useState(props.selectPanel || '');
  const history = useHistory();

  // set nav tab
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  };

  // set selectPanel to redux-persist
  useEffect(
    () => {
      const _value = value === 'ogi' ? 'login' : value
      store.dispatch(createSelectPanelAction(_value))
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
        <Tab onClick={() => history.push('/servers')} value="servers" label="servers" />
        <Tab onClick={() => history.push('/backupFiles')} value="backupFiles" label="backupFiles" />
        <Tab onClick={() => history.push('/tracing')} value="tracing" label="tracing" />
      </Tabs>
    </Box>
  );
}