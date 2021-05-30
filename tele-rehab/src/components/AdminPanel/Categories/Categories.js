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
  const [changebleCategory, setChangebleCategory] = useState(null);


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

    props.setCategories(data);
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
            .then((res) => { console.log(res) })
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

    await getCategories();

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

  const changeCategoryName = (value, id, parentId = null) => {
    let categoriesList = [...categories];

    console.log(value)

    if (parentId !== null) {

      categoriesList.map(parent => {
        if (parentId === parent._id) {
          parent.children.map(child => {
            if (child._id === id) {
              child.name = value

              fetch(`http://localhost:3000/categories/${parentId}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(parent)
              })
                .then((res) => { setCategories(categoriesList); })
                .catch((err) => { console.log(err) })

              return;
            }
          })
        }
      })

    } else {

      fetch(`http://localhost:3000/categories/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: value})
      })
        .then((res) => { getCategories(); })
        .catch((err) => { console.log(err) })

      return;

    }

    setCategories(categoriesList);
    setChangebleCategory(null);

  }

  const renderCategories = () => {
    return categories.map(parent => {
      return (
        <div className="category" key={parent._id}>

          <div className="category-line">
            {
              changebleCategory === parent._id ?
                (
                  <div className="category-item">
                    <TextField
                      autoFocus
                      variant="outlined"
                      defaultValue={parent.name}
                      onFocus={() => { setChangebleCategory(parent._id) }}
                      onBlur={(e) => { changeCategoryName(e.target.value, parent._id) }}
                    />
                  </div>
                )
                :
                (
                  <div
                    className="category-item"
                    onDoubleClick={(e) => { setChangebleCategory(parent._id) }}
                  >
                    {parent.name}
                  </div>
                )
            }
            <div className="category-item">
            </div>
            <div className="category-item">
              <div className="category-subitem" onClick={() => { deleteCategory({ id: parent._id, parent: null }) }}> DELETE </div>
            </div>
          </div>

          <div className="category_children">

            {parent.children.map(child => {
              return (
                <div className="category-line" key={child._id}>
                  {
                    changebleCategory === child._id ?
                      (
                        <div className="category-item">
                          <TextField
                            autoFocus
                            variant="outlined"
                            defaultValue={child.name}
                            onFocus={() => { setChangebleCategory(child._id) }}
                            onBlur={(e) => { changeCategoryName(e.target.value, child._id, parent._id) }}
                          />
                        </div>
                      )
                      :
                      (
                        <div
                          className="category-item"
                          onDoubleClick={(e) => { setChangebleCategory(child._id) }}
                        >
                          {child.name}
                        </div>
                      )
                  }
                  {/* <div className="category-item">{child._id}</div> */}
                  <div className="category-item">
                    <div className="category-subitem" onClick={() => { deleteCategory({ id: child._id, parent: child.parent }) }}> DELETE </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      )
    })
  }

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