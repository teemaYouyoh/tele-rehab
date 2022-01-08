import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ModalCustom from "../../Modal/Modal";

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
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [underCategories, setUnderCategories] = useState([]);
  const [videoURL, setVideoURL] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [filtredVideos, setFiltredVideos] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [changebleVideo, setChangebleVideo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);


  useEffect(async () => {
    await getVideos();
    const responseCategories = await fetch('https://api.tele-rehab.com.ua/categories', {
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
    const response = await fetch(`https://api.tele-rehab.com.ua/videos/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setVideos(data);
    // setFiltredVideos(data);
  }

  async function addVideo() {
    if (name && videoURL && category) {
      const formData = {
        name,
        url: videoURL,
        category,
        // review: "Тупо лучшее"
      }
      const response = await fetch(`https://api.tele-rehab.com.ua/videos/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(async (res) => {
        await setIsOpen(true);
      });
      await setName("");
      await setVideoURL("");
      await setCategory("");
      await getVideos();
      await renderVideos();
    }
  }

  useEffect(async () => {

    if (selectedCategory !== "") {
      categories.forEach((item) => {
        if ( selectedCategory === item._id ) {
          setUnderCategories(item);
          return;
        }
      })
    }

  }, [selectedCategory])

  async function clearVideos() {
    await setFiltredVideos([]);
  }

  // useEffect(async () => {
  //   let modifiedVideos = [];
  //   setFiltredVideos([]);

  //   console.log("ENTERED", filtredVideos);
  //   if (filterCategory !== "") {
  //     // console.log(filterCategory);
  //     const responseCategories = await fetch(`https://api.tele-rehab.com.ua/categories/${filterCategory}`, {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     });
  //     console.log("BEFORE CLEAT", filtredVideos);
  //     await setFiltredVideos([]);
  //     console.log("AFTER CLEAT", filtredVideos);
  //     let dataCategories = await responseCategories.json();
  //     setUnderCategories(dataCategories);

  //     dataCategories.children.forEach(item => {
  //       let element = videos.filter(video => video.category === item._id);
  //       // console.log("VIDEOS", videos);
  //       if (element.length > 0) {
  //         console.log(2, "element", element[0].name);
  //         modifiedVideos.push(element[0]);
  //         // setFiltredVideos([...filtredVideos, element[0]]);
  //       }
  //     })

  //     setFiltredVideos(modifiedVideos);
  //     renderVideos();


  //     // setIsReady(true);
  //   }

  // }, [filterCategory])

  function filterNewVideos(dataCategories) {
    dataCategories.children.forEach(item => {
      let element = videos.filter(video => video.category === item._id);
      // console.log("VIDEOS", videos);
      if (element.length > 0) {
        console.log(2, "element", element[0].name);
        setFiltredVideos([...filtredVideos, element[0]]);
      }
    })
    return 0;
  }

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  async function deleteVideo(id) {
    const response = await fetch(`https://api.tele-rehab.com.ua/videos/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (res)=>{
      await setIsOpenDelete(true);
    });

    await getVideos();
    await renderVideos();
  }


  const changeVideoName = (value, id) => {
    let videosList = [...videos];

    console.log(value)


    videosList.map(video => {
      if (id === video._id) {
        if (value !== video.name) {
          video.name = value

          fetch(`https://api.tele-rehab.com.ua/videos/${video._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(video)
          })
            .then(async (res) => { console.log(await res.json()); getVideos(); })
            .catch((err) => { console.log(err) })

          return;
        }
      }
    })

    getVideos();
    setChangebleVideo(null);
  }

  function renderVideos() {
    // console.log(filtredVideos);
    // console.log(4,filtredVideos, "isReady ", isReady);
    return filtredVideos.map((item) => {
      const { _id, name, url, category } = item;
      const videoId = getId(url);

      return (
        <div className="video-page-wrapper-card">
          <div className="video_iframe">
            <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen ></iframe>
          </div>
          <p className="video_label">
            {
              changebleVideo === _id ?
                (
                  <div className="category-item">
                    <TextField
                      autoFocus
                      variant="outlined"
                      defaultValue={name}
                      onFocus={() => { setChangebleVideo(_id) }}
                      onBlur={(e) => { changeVideoName(e.target.value, _id) }}
                    />
                  </div>
                )
                :
                (
                  <span
                    onDoubleClick={(e) => { setChangebleVideo(_id) }}
                  >
                    {name}
                  </span>
                )
            }
          </p>

          <button className="delete-btn" onClick={() => deleteVideo(item._id)}>Delete</button>
        </div>
      )
    })
  }

  function updateModal(value) {
    setIsOpen(value);
    setIsOpenDelete(value);
  }

  const renderCategoriesList = () => {
    return categories.map((parent) => {
      return parent.children.map((child) => {
        return (
          <MenuItem value={child._id} key={child._id}>{child.name}</MenuItem>
        )
      })
    })
  }

  const newRenderVideo = () => {
    let isEmpty = true;

    return videos.map(video => {

      if ( filterCategory === video.category || filterCategory === "none") {
        const { _id, name, url, category } = video;
        const videoId = getId(url);

        return (
          <div className="video-page-wrapper-card">
            <div className="video_iframe">
              <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen ></iframe>
            </div>
            <p className="video_label">
              {
                changebleVideo === _id ?
                  (
                    <div className="category-item">
                      <TextField
                        autoFocus
                        variant="outlined"
                        defaultValue={name}
                        onFocus={() => { setChangebleVideo(_id) }}
                        onBlur={(e) => { changeVideoName(e.target.value, _id) }}
                      />
                    </div>
                  )
                  :
                  (
                    <span
                      onDoubleClick={(e) => { setChangebleVideo(_id) }}
                    >
                      {name}
                    </span>
                  )
              }
            </p>
  
            <button className="delete-btn" onClick={() => deleteVideo(video._id)}>Delete</button>
          </div>
        )
      } else {
        isEmpty = true;
      }

    })

    
    if ( isEmpty ) {
      return (<div>В данной категории нет видео</div>)
    }
  }

  return (
    <div className="admin-video-wrapper">
      <div className="box">
        <FormControl variant="outlined" >
          <div className="select-group">
            <InputLabel id="demo-simple-select-outlined-label">Категория</InputLabel>
            <Select
              className="user_selected-input"
              labelId="demo-simple-select-outlined-label"
              onChange={(e) => setFilterCategory(e.target.value)}
              // value={parentCategoryId || ""}
              // onChange={(e) => { setParentCategoryId(e.target.value) }}
              label="Выберите пользователя"
              defaultValue="none"
            >
              <MenuItem value="none">
                Выберите категорию
              </MenuItem>
              { renderCategoriesList() }
            </Select>
          </div>
        </FormControl>
        <div className="box-items">
          {newRenderVideo()}
        </div>
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
              onChange={(e) => setSelectedCategory(e.target.value)}
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

        <Button variant="contained" onClick={() => addVideo()} color="primary" >
          Добавить
        </Button>
        {videoURL &&
          <div className="video_iframe-preload">
            <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${getId(videoURL)}`} frameBorder="0" allowFullScreen ></iframe>
          </div>
        }

      </div>
      <ModalCustom
          title = {"Видео успешно добавлено!"}
          buttonText = {"Ок"}
          buttonClick = {updateModal}
          updateModal = {updateModal}
          isOpen={isOpen}
          svg={false}
      />

      <ModalCustom
          title = {"Видео успешно удалено!"}
          buttonText = {"Ок"}
          buttonClick = {updateModal}
          updateModal = {updateModal}
          isOpen={isOpenDelete}
          svg={false}
      />
    </div>
  );
};

export default VideoCard;