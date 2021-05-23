import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Categories from './Categories/Categories';
import CategoryList from './CategoryList/CategoryList';
import AppointmentsList from './AppointmentsList/AppointmentsList';

import './AdminPanel.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminPanel = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectCategory] = useState(null);
  const [value, setValue] = React.useState(0);

  useEffect(async () => {

    const response = await fetch('http://localhost:3000/categories', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setCategories(data);

  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Листы назначений" {...a11yProps(0)} />
          <Tab label="Категории" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className="tab__appointment">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectCategory={setSelectCategory}
          />
          <AppointmentsList
            selectedCategory={selectedCategory}
          />
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Categories categories={categories} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>



    </div>
  );
};

export default AdminPanel;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
