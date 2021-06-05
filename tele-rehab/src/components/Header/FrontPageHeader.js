import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
// import HeaderMenu from './HeaderMenu';
import logo from '../../img/Tele-Rehab.svg'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const FrontPageHeader = () => {
  const history = useHistory();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  
  useEffect(async () => {
    if (localStorage.getItem("user")) {
      setCurrentUser(localStorage.getItem("user"));
    }
  }, [])

  async function openModal() {
    setIsOpen(true);
    let response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let data = await response.json();
    await setUsers(data);
  }
  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }
  function signIn(e) {
    e.preventDefault();
    console.log(users);
    users.forEach((item) => {
      const { email, password, name, _id } = item;
      if (email === emailUser && password === passwordUser) {
        localStorage.setItem("user", name);
        localStorage.setItem("id", _id);
        history.push({
          pathname: "/personal"
        })
      } else {
        setErrorMsg("Email или пароль не совпадают*")
      }
    })
  }

  return (

    <header className="header header-frontpage">
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <h2 className="popup-title">Зайти в личный кабинет</h2>
          <form name="login-form" onSubmit={(e) => signIn(e)} id="login-form">
            <label>{!errorMsg ? "Email" : <span className="error-message">{errorMsg}</span>}</label>
            <input onChange={(e) => setEmail(e.target.value)}></input>
            <label>{!errorMsg ? "Пароль" : <span className="error-message">{errorMsg}</span>}</label>
            <input onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" className="btn">Вход</button>
          </form>
          <button className="popup-close" onClick={closeModal}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.45868 6L11.5407 1.91797C11.7344 1.72458 11.8434 1.46215 11.8437 1.18841C11.8439 0.914677 11.7354 0.652056 11.542 0.458324C11.3486 0.264592 11.0862 0.155618 10.8124 0.155376C10.5387 0.155135 10.2761 0.263644 10.0824 0.457035L6.00032 4.53906L1.91829 0.457035C1.72456 0.263302 1.4618 0.154465 1.18782 0.154465C0.913845 0.154465 0.651088 0.263302 0.457355 0.457035C0.263623 0.650767 0.154785 0.913524 0.154785 1.1875C0.154785 1.46148 0.263623 1.72424 0.457355 1.91797L4.53939 6L0.457355 10.082C0.263623 10.2758 0.154785 10.5385 0.154785 10.8125C0.154785 11.0865 0.263623 11.3492 0.457355 11.543C0.651088 11.7367 0.913845 11.8455 1.18782 11.8455C1.4618 11.8455 1.72456 11.7367 1.91829 11.543L6.00032 7.46094L10.0824 11.543C10.2761 11.7367 10.5388 11.8455 10.8128 11.8455C11.0868 11.8455 11.3496 11.7367 11.5433 11.543C11.737 11.3492 11.8459 11.0865 11.8459 10.8125C11.8459 10.5385 11.737 10.2758 11.5433 10.082L7.45868 6Z" fill="black" fill-opacity="0.19" />
            </svg>
          </button>
        </Modal>
      </div>
      <div className="container">
        <div className="header-wrap">
          <div className="header-logo">
            <Link to="/"><img src={logo} alt="logo" /></Link>
          </div>
          <div className="header-menu">
            <div className="header-menu">
              <nav className="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" for="menu__toggle">
                  <span></span>
                </label>
                <ul className="header-menu__list menu__box">
                  {/* <li><a className="menu__item menu__item_mob" href="#"><img src="img/logo-header.svg" alt="Logo"></a></li>  */}
                  <li><Link to="/" className="menu__item">Главная</Link></li>
                  <li><a className="menu__item" href="#about">О проекте</a></li>
                  <li><a className="menu__item" href="#questions">Вопрос-ответ</a></li>
                  <li><a className="menu__item" href="#footer">Контакты</a></li>
                  <li className="mobile menu__item">{currentUser ? <Link to="/personal" >Привет, {currentUser}</Link> : <button onClick={openModal} className="header-log__btn btn" href="#">Кабинет</button>}</li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="header-log">
            {currentUser ? <Link to="/personal" className="user-sign-in">Привет, {currentUser}</Link> : <button onClick={openModal} className="header-log__btn btn" href="#">Кабинет</button>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrontPageHeader;