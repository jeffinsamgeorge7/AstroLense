import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Exoml from '../Exoml';
import Exomlsvm from '../Exomlsvm';

export default function Predicttab() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Algorithm 1" value="1" />
            <Tab label="Algorithm 2" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Exoml/></TabPanel>
        <TabPanel value="2"><Exomlsvm/></TabPanel>
      </TabContext>
    </Box>
  );
}