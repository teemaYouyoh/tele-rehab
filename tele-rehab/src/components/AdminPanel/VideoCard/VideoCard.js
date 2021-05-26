import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

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


const VideoCard = () => {
  const [videos, setVideos] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [underCategories, setUnderCategories] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(async ()=>{
    await getVideos();
    const responseCategories = await fetch('http://localhost:3000/categories', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let dataCategories = await responseCategories.json();

    setCategories(dataCategories);

    setIsReady(true);
  }, [])


  async function getVideos() {
    const response = await fetch(`http://localhost:3000/videos/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setVideos(data);
  }

  async function addVideo(){
    if(name && videoURL && category){
      const formData = {
        name,
        url: videoURL,
        category,
        // review: "Тупо лучшее"
      }
      const response = await fetch(`http://localhost:3000/videos/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      await getVideos();
    }
  }

  useEffect(async ()=>{
    console.log(2);
    if(selectedCategory !== ""){
      console.log(3);
      const responseCategories = await fetch(`http://localhost:3000/categories/${selectedCategory}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      let dataCategories = await responseCategories.json();

      setUnderCategories(dataCategories);
    }

  },[selectedCategory])

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
  }

  function renderVideos(){
    return videos.map((item)=>{
      const {name, url, category} = item;
      const videoId = getId(url);

      return(
          <div className="video-page-wrapper-card">
            <div className="video_iframe">
              <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen ></iframe>
            </div>
            <p className="video_label">{name}</p>
          </div>
      )
    })
  }

  return (
    <div className="admin-video-wrapper">
      <div className="box">
        {isReady && renderVideos()}
      </div>
      <div className="controls">
        <TextField
            id="outlined-basic"
            label="Название видео"
            variant="outlined"
            onChange={(e) => { setName(e.target.value) }}
        />
        <TextField
            id="outlined-basic"
            label="Ссылка на видео"
            variant="outlined"
            onChange={(e) => { setVideoURL(e.target.value) }}
        />


        <FormControl variant="outlined" >
          <div className="select-group">
            <InputLabel id="demo-simple-select-outlined-label">Родительская категория</InputLabel>
            <Select
                className="user_selected-input"
                labelId="demo-simple-select-outlined-label"
                onChange={(e)=>setSelectedCategory(e.target.value)}
                // value={parentCategoryId || ""}
                // onChange={(e) => { setParentCategoryId(e.target.value) }}
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
            {underCategories.children &&
                <div>
                  {/*<InputLabel id="demo-simple-select-outlined-label-podcat">Подкатегория</InputLabel>*/}
                  {/*<Select*/}
                  {/*    onChange={(e) => setCategory(e.target.value)}*/}
                  {/*    className="user_selected-input"*/}
                  {/*    labelId="demo-simple-select-outlined-label-podcat"*/}
                  {/*    label="Выберите подкатегорию"*/}
                  {/*>*/}
                  {/*  <MenuItem value="none">*/}
                  {/*    Выберите подкатегорию*/}
                  {/*  </MenuItem>*/}
                  {/*  {*/}
                  {/*    underCategories.children.map((item) => {*/}
                  {/*      return (*/}
                  {/*          <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>*/}
                  {/*      )*/}
                  {/*    })*/}
                  {/*  }*/}
                  {/*</Select>*/}
                  <select name="" id="dop-category" onChange={(e) => setCategory(e.target.value)} className="user_selected-input">
                    <option defaultChecked defaultValue="Выберите подкатегорию" value=""></option>
                    {
                      underCategories.children.map((item) => {
                        return (
                            <option value={item._id} key={item._id}>{item.name}</option>
                        )
                      })
                    }
                  </select>
                </div>

            }
          </div>

        </FormControl>

        <Button variant="contained" onClick={()=>addVideo()} color="primary" >
          Добавить
        </Button>
        {videoURL &&
        <div className="video_iframe-preload">
          <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${getId(videoURL)}`} frameBorder="0" allowFullScreen ></iframe>
        </div>
        }

      </div>
     </div>
  );
};

export default VideoCard;