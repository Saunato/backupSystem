import { useState } from 'react';
import { useHistory  } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function HeaderItemBar() {
  const [value, setValue] = useState('one');
  const history = useHistory();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab onClick={() => history.push('/example')} value="one" label="example" />
        <Tab onClick={() => history.push('/singlepredict')} value="two" label="singlepredict" />
        <Tab onClick={() => history.push('/batchpredict')} value="three" label="batchpredict" />
      </Tabs>
    </Box>
  );
}