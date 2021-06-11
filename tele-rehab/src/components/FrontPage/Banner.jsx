import React, {useEffect, useRef, useState} from 'react';
import ModalCustom from "../Modal/Modal";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMask from 'react-input-mask';
import { useForm, Controller } from "react-hook-form";
import { TextField, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Banner = () => {
  const { control, handleSubmit, errors, register } = useForm({
    mode: "onChange"
  });
  const formPhone = useRef();
  const [name, setName] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [birthday, setBirthday] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const [errorForm, setErrorForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState("");

  // MODAL VARIABLES
  const [modalText, setModalText] = useState("");
  const [modalButton, setModalButton] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalFinish, setModalFinish] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // END MODAL VARIABLES
  const classes = useStyles();
  function focusClick(e) {
    e.preventDefault();
    let nameLabel = document.getElementById("name-label");
    nameLabel.style.display = "none";
  }
  function focusPhoneClick(e) {
    let phoneLabel = document.getElementById("phone-label");
    phoneLabel.style.display = "none";
  }
  function focusEmailClick(e) {
    let emailLabel = document.getElementById("email-label");
    emailLabel.style.display = "none";
  }
  function onFocusClick(e) {
    e.preventDefault();
    let inputName = document.getElementById("banner-name");
    if (inputName.value === '') {
      let nameLabel = document.getElementById("name-label");
      nameLabel.style.display = "block";
    }
  }
  function onFocusPhoneClick(e) {
    e.preventDefault();
    let inputPhone = document.getElementById("banner-phone");
    if (inputPhone.value === '') {
      let phoneLabel = document.getElementById("phone-label");
      phoneLabel.style.display = "block";
    }
  }
  function onFocusEmailClick(e) {
    e.preventDefault();
    let inputEmail = document.getElementById("banner-email");
    if (inputEmail.value === '') {
      let emailLabel = document.getElementById("email-label");
      emailLabel.style.display = "block";
    }
  }

  function changeFile(e) {
    let reader = new FileReader();
    let fileLoaded = e.target.files[0];
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("form-file", e.target.files[0])

    reader.onloadend = () => {
      // fetch(`https://tele-rehab-api.vps-touchit.space/upload`, {
      fetch(`http://localhost:3001/upload`, {
        method: 'POST',
        mode: 'cors',
        body: formData
      }).then(async (res) => {
        const file = await res.json();
        console.log(file);
        // setFile(e.target.files[0])
        setFile(file.filename);
      })

    }

    reader.readAsDataURL(fileLoaded);
  }
  async function submitForm(event) {
    event.preventDefault();
    await setErrorForm(false);
    const formData = {
      name,
      phone,
      email,
      birthday,
      comment,
      file: file
    }
    console.log(formData);
    var isError = false;
    for (let i in formData) {
      if (formData[i] === undefined) {
        isError = true;
        console.log(isError);
        await setErrorForm(true);
      }
    }
    console.log(isError);
    await sendMessage(formData, isError);

  }

  async function sendMessage(formData, isError) {
    await setIsLoading(true);
    console.log("formData", formData);
    console.log(isError);
    if (!isError) {
      console.log(formData);
      // await fetch(`https://tele-rehab-api.vps-touchit.space/send/`, {
      await fetch(`http://localhost:3001/send/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
        .then(async (res) => {
          const data = await res.json();

          if (data.success) {
            setModalText("Запрос на регистрацию успешно отправлен")
            setModalButton("Закрыть")
            setIsOpen(true)
            await setIsLoading(false);
            await setName("")
            await setPhone("")
            await setEmail("")
            await setBirthday("")
            await setComment("")
          } else {
            console.error(res);
            await setIsLoading(false);
            onSendMessageError();
          }


        })
        .catch((err) => {
          console.error(err);
          onSendMessageError();

        })
    } else {
      onSendMessageError();
    }
  }

  const onSendMessageError = () => {
    setModalText("Произошла ошибка при отправке данных. Пожалуйста, повторите попытку.")
    setModalButton("Закрыть")
    setIsOpen(true)
  }


  // MODAL FUNCTIONS
  function updateModal(value) {
    setIsOpen(value);
    setModalFinish(value);
  }

  function openModal() {
    setIsOpen(true);
  }
  function openFinishModal() {
    setModalFinish(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }
  // END MODAL FUNCTIONS

  return (
    <>
      <div className="banner-section">
        <div className="container">
          <div className="banner-wrap">
            <div className="banner-info">
              <h1 className="banner-info__title">Видео реабилитация и программы онлайн</h1>
              <p className="banner-info__subtitle">Более детальное но краткое описание что это за сайт и чем
              он может помочь пользователю. Более детальное но краткое описание что это за сайт и чем он может помочь пользователю Более детальное но краткое описание что это за сайт и чем
                он может помочь пользователю</p>
            </div>
            <div className="banner-form form-banner">
              <div className="form-wrap">
                <form encType="multipart/form-data" onSubmit={(event) => submitForm(event)} name="banner-form" id="banner-form">
                  {isLoading && <CircularProgress />}
                  <p className="form-banner__title">Пройти регистрацию</p>
                  <div className="form-item">
                    <div className="form-item__wrap">
                      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="banner-name" onFocus={focusClick} onBlur={onFocusClick} />
                      <label htmlFor="banner-name" id="name-label">ФИО <span>*</span></label>
                    </div>
                    <div className="form-item__wrap">
                      {/*<input id="banner-phone" name="phone" value={phone} type="tel" onChange={(e) => setPhone(e.target.value)} onFocus={focusPhoneClick} onBlur={onFocusPhoneClick} />*/}
                      <InputMask
                          mask="+38(999)-999-9999"
                          value={phone}
                          onChange={(e)=>setPhone(e.target.value)}
                          id="banner-phone"
                          name="phone"
                          onFocus={focusPhoneClick}
                          onBlur={onFocusPhoneClick}
                      />
                      <label htmlFor="banner-phone" id="phone-label">Номер телефона <span>*</span></label>
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="form-item__wrap">
                      <input type="email" name="email" value={email} id="banner-email" onChange={(e) => setEmail(e.target.value)} onFocus={focusEmailClick} onBlur={onFocusEmailClick} />
                      <label htmlFor="banner-email" id="email-label">Email <span>*</span></label>
                    </div>
                    <div className="form-item__wrap">
                      <input type="date" name="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} id="banner-birthday" placeholder="Дата рождения" />
                    </div>
                  </div>
                  <textarea name="comment" id="banner-com" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Опишите диагноз"></textarea>
                  <p className="form-banner__attachment">
                    Прикрепить файл <sup>*</sup>
                    <span>максимум 15 мб</span>
                    <p className="file-name">{file}</p>
                    <input id="input-file" value={file} name="form-file" accept=".png, .jpg, .jpeg" onChange={(e) => changeFile(e)} type="file" />
                  </p>
                  <button className="btn form-banner__btn" type={isLoading ? "button" : "submit"}>Зарегистрироваться</button>
                  <span className="form-banner__addition">После регистрации с вами свяжется специалист обсудит с вами проблемы и ее решение, предложит оптимальную программу</span>
                  {errorForm && !msg ? <span className="form-banner__addition error-message">Необходимо заполнить все поля</span> : <span className="form-banner__addition"></span>}
                  {msg ? <span className="form-banner__addition success-message">{msg}</span> : <span className="form-banner__addition"></span>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCustom
        title={modalText}
        buttonText={modalButton}
        updateModal={updateModal}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        buttonClick={closeModal}
      />
    </>
  );
};

export default Banner;