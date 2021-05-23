import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    '&:hover': {
      background: "#0000001a",
    }
  },
  selectedItem: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#0000001a",
    '&:hover': {
      background: "#0000001a",
    }
  },
}));

const CategoriesList = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState("");

  const handleClick = (id) => {
    id === open ? setOpen("") : setOpen(id);
  };

  const renderCategories = () => {
    return props.categories.map((item) => {
      return (
        <div key={item._id}>
          <ListItem button onClick={() => { handleClick(item._id) }} >
            <ListItemText primary={item.name} />
            {item._id === open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={item._id === open} timeout="auto" unmountOnExit >
            <List component="div" disablePadding>

              {
                item.children.map((child, index) => {
                  return (

                    <ListItem
                      button
                      className={ props.selectedCategory === child._id ? classes.selectedItem  : classes.nested}
                      key={child._id}
                      onClick={() => { props.setSelectCategory(child._id) }}
                    >
                      <ListItemText primary={child.name} />
                    </ListItem>

                  )
                })
              }

            </List>
          </Collapse>

        </div>
      )
    })
  }


  return (
    <div className="category-list" style={{ "width": "30%" }}>
      <div className={classes.root}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >

          {renderCategories()}

        </List>
      </div>
    </div>
  );
};

export default CategoriesList;