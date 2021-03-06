import React, { useEffect, useState } from 'react';
import SelectUser from '../SelectUser/SelectUser';
// import VideoCard from '../VideoCard/VideoCard';

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
  const [modifiedVideos, setModifiedVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChanged, setChanged] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedUser !== null) {
      let modifiedVideos = [];

      for (let i = 0; i < videos.length; i++) {
        let isInclude = false;

        for (let j = 0; j < selectedUser.appointments.length; j++) {

          if (selectedUser.appointments[j]._id === videos[i]._id) {
            isInclude = true;

            videos[i].review = selectedUser.appointments[j].review;
            videos[i].repeat = selectedUser.appointments[j].repeat;
            videos[i].days = selectedUser.appointments[j].days;
            videos[i].selected = true;
            modifiedVideos.push(videos[i])

            break;
          }

        }

        if (!isInclude) {
          videos[i].review = "";
          videos[i].selected = false;
          modifiedVideos.push(videos[i])
        }
      }

      setModifiedVideos(modifiedVideos);
      // setChanged(!isChanged);
    }
  }, [selectedUser])

  useEffect(() => {
  }, [isChanged])

  useEffect(() => {
  }, [modifiedVideos])

  useEffect(async () => {
    const response = await fetch(`https://tele-rehab-api.vps-touchit.space/videos/`, {
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
    const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let data = await response.json();

    setUsers(data);
  }, [])


  function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  const updateUser = async () => {
    let appointments = [];

    modifiedVideos.forEach(item => {
      if (item.selected === true) {
        appointments.push(item);
      }
    });


    selectedUser.appointments = appointments;
    selectedUser.statusCourse = false;



      console.log(file);
    if (file === null) {
      console.log(file);
    
      const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/${selectedUser._id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedUser)
      });

      const formData = {
        email: selectedUser.email
      }

      await fetch(`https://tele-rehab-api.vps-touchit.space/update_plan`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(async (res) => { console.log("Success") })
        .catch((err) => { console.log(err) })

    } else {
      const formDataFile = new FormData();
      formDataFile.append("form-file", file)
      console.log(file);

      fetch(`https://tele-rehab-api.vps-touchit.space/upload`, {
        method: 'POST',
        mode: 'cors',
        body: formDataFile
      }).then(async (res) => {
        const file = await res.json();
        console.log(file);

        const newSelectedUser = selectedUser;

        newSelectedUser.attachment = file.filename;

        const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/${newSelectedUser._id}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newSelectedUser)
        });

        const formData = {
          email: newSelectedUser.email
        }
        await fetch(`https://tele-rehab-api.vps-touchit.space/update_plan`, {

        // await fetch(`https://tele-rehab-api.vps-touchit.space/update_plan`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(async (res) => { console.log("Success") })
          .catch((err) => { console.log(err) })
      })
    }





  }

  const renderVideos = () => {
    return modifiedVideos.map((item, index) => {
      if (item.category === props.selectedCategory) {
        const videoId = getId(item.url);

        return (
          <div className={item.selected ? "video-container selected" : "video-container"} key={item._id} >
            <div className="video_iframe">
              <iframe width="100%" height="100%" src={`//www.youtube.com/embed/${videoId}`} frameBorder="0" allowFullScreen ></iframe>
            </div>

            <div className="video_info">
              <div className="video_select-bg" onClick={(e) => { setVideoSelected(index) }}></div>

              <p className="video_label">{item.name}</p>

              <div className="video_review">
                <TextField
                  className="video_review"
                  label="?????????????????????? ?? ???????????? ??????????"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={item.review}
                  onChange={(e) => { setReview(e.target.value, index) }}
                />
              </div>

              <div className="video_counts" >

                <div className="count_item" >
                  <TextField
                    label="???????????????????? ??????-???? ??????"
                    type="number"
                    value={item.repeat}
                    InputProps={{ inputProps: { min: 1 } }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => { setCountRepeat(e.target.value, index) }}
                  />
                </div>

                <div className="count_item" >
                  <TextField
                    label="???????????????????? ??????-???? ????????"
                    type="number"
                    value={item.days}
                    InputProps={{ inputProps: { min: 1 } }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={(e) => { setCountDays(e.target.value, index) }}
                  />
                </div>

              </div>
            </div>
          </div>
        )
      }
    })
  }

  const setVideoSelected = (index) => {
    let newModifiedVideos = [...modifiedVideos];
    newModifiedVideos[index].selected = !newModifiedVideos[index].selected;
    setModifiedVideos(newModifiedVideos);
  }

  const setReview = (value, index) => {
    let newModifiedVideos = [...modifiedVideos];
    newModifiedVideos[index].review = value;
    setModifiedVideos(newModifiedVideos);
  };

  const setCountRepeat = (value, index) => {
    let newModifiedVideos = [...modifiedVideos];
    newModifiedVideos[index].repeat = value;
    setModifiedVideos(newModifiedVideos);
  };

  const setCountDays = (value, index) => {
    let newModifiedVideos = [...modifiedVideos];
    newModifiedVideos[index].days = value;
    setModifiedVideos(newModifiedVideos);
  };

  function changeFile(e) {
    let reader = new FileReader();
    let fileLoaded = e.target.files[0];
    console.log(e.target.files[0]);

    reader.onloadend = () => {
      setFile(e.target.files[0])
    }

    reader.readAsDataURL(fileLoaded);
  }

  return (
    <div className="appointments">
      <SelectUser
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
      />
      <div className="video-list">
        {
          selectedUser !== null ?
            props.selectedCategory !== null ?
              renderVideos()
              :
              "???????????????? ??????????????????"
            :
            "???????????????? ????????????????????????"
        }
      </div>
      <div className="wrapper-form-attachment">
        <p className="form-banner__attachment">
          <span className="load">???????????????????? ????????</span> <sup>*</sup>
          <span>???????????????? 15 ????</span>
          <span className="file-name">{file && file.name}</span>
          <input id="input-file" name="form-file" accept=".png, .jpg, .jpeg" onChange={(e) => changeFile(e)} type="file" />
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={updateUser}>
        ??????????????????
      </Button>
    </div>
  );
};

export default VideosList;