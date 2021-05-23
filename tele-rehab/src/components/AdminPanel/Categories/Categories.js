import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import "./Categories.css";

import ObjectID from 'bson-objectid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
    backgroundColor: "#fff"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Categories = (props) => {

  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [isChanged, setChanged] = useState(false);


  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  useEffect(() => {
    setChanged(!isChanged)
  }, [categories])


  const getCategories = async () => {

    console.log("getting cateegories")
    const response = await fetch('http://localhost:3000/categories', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setCategories(data);
  }

  const addCategory = async () => {

    console.log(parentCategoryId)

    if (parentCategoryId !== "none" && parentCategoryId !== undefined) {

      let parentCategory = {};

      let categoriesList = [...categories];

      categoriesList.forEach(item => {

        if (item._id === parentCategoryId) {
          console.log(item)
          item.children.push({ _id: ObjectID().toHexString(), name: categoryName, parent: item._id });

          fetch(`http://localhost:3000/categories/${item._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })
          .then((res) =>{ console.log(res) })
          .catch((err) => { console.log(err) })

          setCategories(categoriesList);
        }

      })


    } else {

      const response = await fetch(`http://localhost:3000/categories`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName })
      });

    }

    getCategories();

  }

  const deleteCategory = async (value) => {

    console.log(value)

    if (value.parent !== null && value.parent !== undefined) {

      let parentCategory = {};

      categories.forEach(item => {
        if (item._id === value.parent) {
          parentCategory = item;
        }
      })

      parentCategory.children.forEach((item, index) => {
        if (item._id === value.id) {
          parentCategory.children.splice(index, 1);

        }
      })

      const response = await fetch(`http://localhost:3000/categories/${value.parent}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parentCategory)
      });

      console.log(await response.json());

    } else {

      const response = await fetch(`http://localhost:3000/categories/${value.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log(await response.json());

    }



    getCategories();

  }

  const renderCategories = () => {
    return props.categories.map(item => {
      return (
        <div className="category">

          <div className="category-line">
            <div className="category-item">{item.name}</div>
            <div className="category-item">
              <div className="category-subitem"> UPDATE </div>
              <div className="category-subitem" onClick={() => { deleteCategory({ id: item._id, parent: null }) }}> DELETE </div>
            </div>
          </div>

          <div className="category_children">

            {item.children.map(item => {
              return (
                <div className="category-line">
                  <div className="category-item">{item.name}</div>
                  <div className="category-item">{item._id}</div>
                  <div className="category-item">
                    <div className="category-subitem"> UPDATE </div>
                    <div className="category-subitem" onClick={() => { deleteCategory({ id: item._id, parent: item.parent }) }}> DELETE </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      )
    })
  }

  console.log(parentCategoryId)

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Название категории"
        variant="outlined"
        onChange={(e) => { setCategoryName(e.target.value) }}
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Родительская категория</InputLabel>
        <Select
          className="user_selected-input"
          labelId="demo-simple-select-outlined-label"
          value={parentCategoryId || ""}
          onChange={(e) => { setParentCategoryId(e.target.value) }}
          label="Выберите пользователя"
        >
          <MenuItem value="none">
            Выберите родительскую категорию
          </MenuItem>
          {
            categories.map((item) => {
              return (
                <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={addCategory}>
        Добавить
      </Button>

      {renderCategories()}
    </div>
  );
};

export default Categories;