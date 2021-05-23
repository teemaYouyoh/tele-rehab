import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './SelectUser.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    backgroundColor: "#fff"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectUser = (props) => {

  const classes = useStyles();

  const handleSelectUser = (id) => {
    if (id === "none" || id === "") {
      props.setSelectedUser(null);
    } else {
      props.users.forEach((user, index) => {
        if (user._id == id) {
          props.setSelectedUser(user);
          return;
        }
      });
    }

  }

  return (
    <div className="select-user">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Пользователь</InputLabel>
        <Select
          className="user_selected-input"
          labelId="demo-simple-select-outlined-label"
          value={props.selectedUser !== null ? props.selectedUser._id : ""}
          onChange={(e) => { handleSelectUser(e.target.value) }}
          label="Выберите пользователя"
        >
          <MenuItem value="none">
            Выберите пользователя
          </MenuItem>
          {
            props.users.map((user) => {
              return (
                <MenuItem value={user._id} key={user._id}>{user.name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectUser;