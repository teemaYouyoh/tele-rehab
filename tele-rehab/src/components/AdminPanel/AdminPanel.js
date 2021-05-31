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
import VideoCard from "./VideoCard/VideoCard";
import UsersRegistration from "./UsersRegistration/UsersRegistration";
import UsersList from "./UsersList/UsersList";

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
    const isAdmin = localStorage.getItem("id");
    if(isAdmin !== "60af4a7804705e2a622185b0"){
      window.location.href = window.location.origin;
    }
    const response = await fetch('https://tele-rehab-api.vps-touchit.space/categories', {
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
          <Tab label="Видео" {...a11yProps(2)} />
          <Tab label="Зарегистрировать пользователя" {...a11yProps(3)}/>
          <Tab label="Пользователи" {...a11yProps(4)}/>
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
        <div>
          <Categories
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <VideoCard categories={categories} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <UsersRegistration />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <UsersList />
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
          {children}
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
