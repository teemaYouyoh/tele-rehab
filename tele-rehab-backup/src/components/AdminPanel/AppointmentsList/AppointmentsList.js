import React, { useEffect, useState } from 'react';
import SelectUser from '../SelectUser/SelectUser';
import VideoCard from '../VideoCard/VideoCard';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './AppointmentsList.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));



const VideosList = (props) => {
  const classes = useStyles();

  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
  }, [selectedUser])

  useEffect(() => {
  }, [isChanged])

  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/videos/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setVideos(data);
  }, [])

  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setUsers(data);
  }, [])


  const selectUser = (user) => {
    setSelectedUser(user);
  };

  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  const updateUser = async () => {
    console.log(selectedUser);
    const response = await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedUser)
    });
  }
  console.log(selectedUser)

  const renderVideos =  () => {
    return videos.map( async (item, index) => {
      if (item.category === props.selectedCategory) {
        const videoId = getId(item.url);
        let appointmentsIndex = -1;

        await selectedUser.appointments.forEach(( app, index ) => {
          appointmentsIndex = app.video !== undefined && app.video === item._id ? index : -1;
        })

        const review = appointmentsIndex > -1 ? selectedUser.appointments[appointmentsIndex].review : "";

        return (
          <VideoCard appointment={appointment}/>
          )
      }
    })
  }

  const setVideoSelected = async (index) => {
    if (selectedUser !== null) {
      console.log("setVideoSelected", selectedUser);
      let newSelectedUser = selectedUser;

      if (newSelectedUser.appointments !== undefined) {

        let selectedVideoIndex = newSelectedUser.appointments.indexOf(videos[index]._id);

        if (selectedVideoIndex > -1) {
          newSelectedUser.appointments.splice(selectedVideoIndex, 1);
        } else {
          newSelectedUser.appointments.push(videos[index]._id)
        }

      } else {
        newSelectedUser.appointments = [];
        newSelectedUser.appointments.push(videos[index]._id);
      }
      await setChanged(!isChanged);
      await setSelectedUser(newSelectedUser);

    } else {
    }
  }

  const setReview = (value, index) => {
    let newVideos = [...videos];
    newVideos[index].review = value;
    setVideos(newVideos);
  };

  const setCountRepeat = (value, index) => {
    let newVideos = [...videos];
    newVideos[index].repeat = value;
    setVideos(newVideos);
  };

  const setCountDays = (value, index) => {
    let newVideos = [...videos];
    newVideos[index].days = value;
    setVideos(newVideos);
  };

  return (
    <div className="appointments">
      <SelectUser
        selectedUser={selectedUser}
        selectUser={selectUser}
        users={users}
      />
      <div className="video-list">
        {
          selectedUser !== null ?
            props.selectedCategory !== null ?
              renderVideos()
              :
              "Выберите категорию"
            :
            "Выберите пользователя"
        }
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={updateUser}>
        Сохранить
      </Button>
    </div>
  );
};

export default VideosList;