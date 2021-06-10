import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PersonAreaHeader from '../Header/PersonAreaHeader';
import FooterBottom from '../Footer/FooterBottom';
import Modal from 'react-modal';
import Collapse from '@material-ui/core/Collapse';
import Axios from "axios";
import download from 'downloadjs'
import $ from "jquery";
import ModalCustom from "../Modal/Modal";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import FeedBackModal from "../Modal/FeedBackModal";


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
const PersonArea = () => {
    const history = useHistory();

    const [user, setUser] = useState({});
    const [categories, setCategories] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [categoriesName, setCategoriesName] = useState([]);
    
    const [validationFull, setValidationFull] = useState("");
    const [validationSingle, setValidationSingle] = useState("");
    const [isOpenFeedback, setIsOpenFeedback] = useState(false);
    const [comment, setComment] = useState("");
    const [commentSingle, setCommentSingle] = useState("");


    	// MODAL VARIABLES
	const [modalText, setModalText] = useState("");
	const [modalButton, setModalButton] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalFinish, setModalFinish] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [open, setOpen] = useState("");
	// END MODAL VARIABLES

    const handleClick = (id) => {
        id === open ? setOpen("") : setOpen(id);
        setValidationSingle("");
    };

    function updateModal(value) {
        setIsOpen(value);
        setModalFinish(value);
        setIsOpenFeedback(value);
    }

    useEffect(() => {
        setValidationFull("");
    }, [comment])

    function openModal() {
        setIsOpen(true);
    }
    function openFinishModal(){
        setModalFinish(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    useEffect(async () => {
        let currentUser = localStorage.getItem("id");
        if (currentUser === "60af4a7804705e2a622185b0") {
            setIsAdmin(true);
        }
        if (currentUser) {
            const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/${currentUser}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Request-Origin': '*',
                },
            });

            let data = await response.json();

            setUser(data);
        }

        const responseNew = await fetch('https://tele-rehab-api.vps-touchit.space/categories', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let dataNew = await responseNew.json();
        setCategories(dataNew);
        setIsReady(true);

    }, [])

    useEffect(async () => {
        await getCategoriesName();
        // console.log(categoriesName);
    }, [categories])

    async function getCategoriesName() {
        categories.forEach((item) => {
            setCategoriesName(state => [...state, item.name]);
        })
    }

    function logOut() {
        localStorage.setItem("user", "");
        localStorage.setItem("id", "");
    }

    async function sendComment(e) {
        e.preventDefault();
        if (comment) {
            const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/${user._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: comment })
            });
        } else {
            setValidationFull("Введите коментарий для отправки")
        }
    }

    function sendCourseFinish() {
        fetch(`https://tele-rehab-api.vps-touchit.space/users/${user._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ statusCourse: true })
        }).then( async (res) => {
            const data = await res.json()
            setUser(data);
            setModalFinish(false);
        })


        // history.push({
        //     pathname: "/"
        // })
    }

    async function sendCommentSingle(e, id, comments, indexAppoint) {
        console.log(user._id);
        e.preventDefault();
        if (commentSingle) {
            user.appointments[indexAppoint].comments.push(commentSingle);
            const response = await fetch(`https://tele-rehab-api.vps-touchit.space/users/${user._id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(() => {
                console.log("SUCCESS");
            });
        } else {
            setValidationSingle("Введите коментарий для отправки")
        }
    }

    function renderFunc(currCategory) {
        // console.log(user, categories);
        return user.appointments.map((item, index) => {
            return categories.map((element) => {
                const { name } = element;
                return element.children.map((child) => {
                    // console.log(child._id, item.category, child._id === item.category)
                    if (child._id === item.category && currCategory === name) {
                        // console.log(item.url);
                        const videoId = getId(item.url);

                        return (
                            <div className="person-content">
                                <div className="person-content__wrap">
                                    <div className="person-content__video">
                                        <iframe width="100%" height="315"
                                            src={`//www.youtube.com/embed/${videoId}`}
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen></iframe>
                                        {/*<iframe width="100%" height="315" src="https://www.youtube.com/embed/e1GbGNYIGB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}

                                    </div>
                                    <div className="person-content__info info-person">
                                        <p className="info-person__main">{item.name} </p>
                                        <p className="info-person__main">{item.review} </p>
                                        <div className="info-person__statistic">
                                            <div className="statistic-item">
                                                <p className="statistic-item__name">Количество повторений
                                                    упражнения:</p>
                                                <p className="statistic-item__result">{item.repeat}</p>
                                            </div>
                                            <div className="statistic-item">
                                                <p className="statistic-item__name">Количество дней к выполнению:</p>
                                                <p className="statistic-item__result">{item.days}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => { handleClick(item._id) }} className="info-person__review">
                                            Оставить отзывы по выполнению
                                        </button>
                                        <Collapse in={item._id === open} timeout="auto" unmountOnExit>
                                            <p className="error-message-form">{validationSingle ? validationSingle : ""}</p>

                                            <form className="form-single" onSubmit={(e) => sendCommentSingle(e, item._id, item.comments, index)}>
                                                <textarea onChange={(e) => setCommentSingle(e.target.value)} name="comment-text-single" className="form-single-video"
                                                    placeholder="Ваш комменантарий. Насколько было сложно, больше и так далее">
                                                </textarea>
                                                <button type="submit" className="send-btn">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M1.87717 0.711066C1.74216 0.64304 1.59092 0.61455 1.44065 0.628839C1.29037 0.643128 1.14709 0.699621 1.0271 0.791893C0.907118 0.884164 0.815244 1.00851 0.761933 1.15079C0.708622 1.29306 0.696014 1.44755 0.725543 1.59669L2.98847 9.47794C3.03066 9.62481 3.11313 9.75671 3.22641 9.85847C3.33968 9.96023 3.47915 10.0277 3.62879 10.0532L12.8063 11.6018C13.2386 11.6879 13.2386 12.3119 12.8063 12.3981L3.62879 13.9467C3.47915 13.9722 3.33968 14.0397 3.22641 14.1414C3.11313 14.2432 3.03066 14.3751 2.98847 14.5219L0.725543 22.4032C0.696014 22.5523 0.708622 22.7068 0.761933 22.8491C0.815244 22.9914 0.907118 23.1157 1.0271 23.208C1.14709 23.3003 1.29037 23.3568 1.44065 23.371C1.59092 23.3853 1.74216 23.3568 1.87717 23.2888L22.8451 12.7263C22.9789 12.6588 23.0913 12.555 23.17 12.4268C23.2486 12.2985 23.2902 12.1507 23.2902 11.9999C23.2902 11.8492 23.2486 11.7014 23.17 11.5731C23.0913 11.4448 22.9789 11.3411 22.8451 11.2736L1.87717 0.711066Z"
                                                            fill="white" />
                                                    </svg>
                                                </button>
                                            </form>
                                        </Collapse>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            })
        })
    }



    const donwloadAttachment = () => {
        const url = "https://tele-rehab-api.vps-touchit.space/1.png";
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        fetch(url,
            {
                mode: "cors",
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(async (resp) => { console.log(await resp.blob()) })


        // var x=new XMLHttpRequest();
        // x.open("GET", url, true);
        // x.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000")

        // x.responseType = 'blob';
        // x.onload=function(e){download(x.response, "dlBinAjax.png", "image/png" ); }
        // x.send();
    };

    function someFunction(values = "") {
        const method = 'GET';
        const url = 'https://tele-rehab-api.vps-touchit.space/1.png';

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => { return response.blob() })
            .then(blob => {
                const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');

                link.href = downloadUrl;
                link.setAttribute('download', 'file.png'); //any other extension
                document.body.appendChild(link);

                link.click();
                link.remove();
            })

    }


    return (
        <div className="person-area">
            <PersonAreaHeader />
            <div className="person-section">
                <div className="container">
                    <div className="person-connections">
                        {/* <div>
                            <a href={`https://tele-rehab-api.vps-touchit.space/1.png`} download="1.png">AAAAAAAAAAAAAAAAAAAAAAAAAA</a>
                            <a href="https://tele-rehab-api.vps-touchit.space/1.png" target="_blank" download>
                                <img src="https://tele-rehab-api.vps-touchit.space/1.png" alt="W3Schools" width="104" height="142" />
                            </a>
                        </div> */}
                        {/* <img src="https://tele-rehab-api.vps-touchit.space/1.png" onClick={() => { someFunction() }} /> */}
                        {isAdmin &&
                            <Link to="/admin" className="person-connections__link" >
                                <svg aria-hidden="true" width="28" height="31" focusable="false" data-prefix="fas" data-icon="user-cog"
                                    className="svg-inline--fa fa-user-cog fa-w-20" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="#00398F"
                                        d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z"></path>
                                </svg>
                            Админ панель
                        </Link>
                        }
                        <Link to="/" onClick={() => logOut()} className="person-connections__link" >
                            <svg aria-hidden="true" width="28" height="31" focusable="false" data-prefix="fas" data-icon="sign-out-alt"
                                className="svg-inline--fa fa-sign-out-alt fa-w-16" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="#00398F"
                                    d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
                            </svg>
                            Выйти с аккаунта
                        </Link>
                        <button onClick={()=>setIsOpenFeedback(true)} className="person-connections__link">
                            <svg width="28" height="31" viewBox="0 0 28 31" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 0.625C6.73057 0.625 0.816406 6.53916 0.816406 13.8086C0.816406 14.6142 0.816406 20.8462 0.816406 20.957C0.816406 22.4109 1.99924 23.5938 3.45312 23.5938H4.4832C4.84602 24.6167 5.82295 25.3516 6.96875 25.3516C8.42264 25.3516 9.60547 24.1687 9.60547 22.7148V15.5664C9.60547 14.1125 8.42264 12.9297 6.96875 12.9297C5.82295 12.9297 4.84602 13.6646 4.4832 14.6875H3.45312C3.14498 14.6875 2.84932 14.7411 2.57422 14.8387V13.8086C2.57422 7.50842 7.69982 2.38281 14 2.38281C20.3002 2.38281 25.4258 7.50842 25.4258 13.8086V14.8387C25.1507 14.7411 24.855 14.6875 24.5469 14.6875H23.5168C23.154 13.6646 22.1771 12.9297 21.0312 12.9297C19.5774 12.9297 18.3945 14.1125 18.3945 15.5664V22.7148C18.3945 24.1687 19.5774 25.3516 21.0312 25.3516C21.2973 25.3516 21.5542 25.3116 21.7965 25.2379C21.4678 26.3197 20.4613 27.1094 19.2734 27.1094H16.4855C16.1227 26.0864 15.1458 25.3516 14 25.3516C12.5461 25.3516 11.3633 26.5344 11.3633 27.9883C11.3633 29.4422 12.5461 30.625 14 30.625C15.1458 30.625 16.1227 29.8901 16.4855 28.8672H19.2734C21.6966 28.8672 23.668 26.8958 23.668 24.4727V23.5938H24.5469C26.0008 23.5938 27.1836 22.4109 27.1836 20.957C27.1836 20.8478 27.1836 14.6136 27.1836 13.8086C27.1836 6.53916 21.2694 0.625 14 0.625ZM6.08984 15.5664C6.08984 15.0818 6.48412 14.6875 6.96875 14.6875C7.45338 14.6875 7.84766 15.0818 7.84766 15.5664V22.7148C7.84766 23.1995 7.45338 23.5938 6.96875 23.5938C6.48412 23.5938 6.08984 23.1995 6.08984 22.7148V15.5664ZM3.45312 16.4453H4.33203V21.8359H3.45312C2.9685 21.8359 2.57422 21.4417 2.57422 20.957V17.3242C2.57422 16.8396 2.9685 16.4453 3.45312 16.4453ZM14 28.8672C13.5154 28.8672 13.1211 28.4729 13.1211 27.9883C13.1211 27.5037 13.5154 27.1094 14 27.1094C14.4846 27.1094 14.8789 27.5037 14.8789 27.9883C14.8789 28.4729 14.4846 28.8672 14 28.8672ZM21.9102 22.7148C21.9102 23.1995 21.5159 23.5938 21.0312 23.5938C20.5466 23.5938 20.1523 23.1995 20.1523 22.7148V15.5664C20.1523 15.0818 20.5466 14.6875 21.0312 14.6875C21.5159 14.6875 21.9102 15.0818 21.9102 15.5664V22.7148ZM25.4258 20.957C25.4258 21.4417 25.0315 21.8359 24.5469 21.8359H23.668V16.4453H24.5469C25.0315 16.4453 25.4258 16.8396 25.4258 17.3242V20.957Z"
                                    fill="#00398F" />
                            </svg>
                            Обратная связь
                        </button>
                        {user.video_chat_url !== undefined && user.video_chat_url !== "" ?
                            (
                                <Link className="person-connections__link" to={{ pathname: '/chat', doctorId: user.video_chat_url }} >
                                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M22.17 7.57374C21.9687 7.46499 21.72 7.47624 21.5288 7.60497L18.75 9.45747V8.12499C18.75 7.77999 18.47 7.49997 18.125 7.49997H9.375C7.5525 7.49997 7.5 11.9887 7.5 12.5C7.5 13.0112 7.5525 17.5 9.375 17.5H18.125C18.47 17.5 18.75 17.22 18.75 16.875V15.5425L21.5288 17.395C21.6325 17.465 21.7538 17.5 21.875 17.5C21.9762 17.5 22.0775 17.475 22.17 17.4262C22.3725 17.3175 22.5 17.1062 22.5 16.875V8.12499C22.5 7.89372 22.3737 7.68249 22.17 7.57374ZM21.25 15.7075L18.4713 13.855C18.28 13.7275 18.0325 13.7162 17.83 13.8238C17.6275 13.9325 17.5 14.1437 17.5 14.375V16.2512L9.4875 16.2775C9.23877 16.0987 8.74998 14.7662 8.74998 12.5C8.74998 10.2338 9.23871 8.90124 9.375 8.75001H17.5V10.625C17.5 10.8563 17.6263 11.0675 17.83 11.1763C18.0325 11.285 18.28 11.2725 18.4713 11.145L21.25 9.29253V15.7075Z"
                                            fill="#00398F" />
                                        <path
                                            d="M25.625 1.25003H4.37502C1.96248 1.25003 0 3.21251 0 5.62499V19.375C0 21.7875 1.96248 23.75 4.37502 23.75H6.25002V29.375C6.25002 29.6175 6.39 29.8388 6.61002 29.9413C6.69375 29.98 6.78504 30 6.87504 30C7.01877 30 7.16127 29.9501 7.27506 29.855L14.6013 23.75H25.6251C28.0375 23.75 30 21.7875 30 19.375V5.62499C30 3.21251 28.0375 1.25003 25.625 1.25003ZM28.75 19.375C28.75 21.0975 27.3475 22.5 25.625 22.5H14.375C14.2288 22.5 14.0875 22.5513 13.975 22.645L7.5 28.0413V23.125C7.5 22.78 7.21998 22.5 6.87498 22.5H4.37502C2.65254 22.5 1.25004 21.0975 1.25004 19.375V5.62499C1.24998 3.90251 2.65248 2.50001 4.37502 2.50001H25.625C27.3475 2.50001 28.75 3.90251 28.75 5.62499V19.375Z"
                                            fill="#00398F" />
                                    </svg>
                                    Видео-конференция
                                </Link>
                            )
                            :
                            null
                        }

                    </div>
                    <div className="person-desk">
                        <h2>{user.name}</h2>
                        <div className="person-tabs">
                            <Tabs>
                                <TabList>
                                    {categoriesName.map(item => {
                                        return (
                                            <Tab>{item}</Tab>
                                        )
                                    })}
                                    {/*<Tab>Физ упражнения</Tab>*/}
                                    {/*<Tab>Самообслуживание</Tab>*/}
                                    {/*<Tab>Логопед</Tab>*/}
                                    { user.attachment !== "" ? (<Tab onClick={() => openModal()}>Лист назначений</Tab>) : null }

                                </TabList>
                                {!user.statusCourse &&
                                    categoriesName.map((item) => {
                                        return (
                                            <TabPanel key={item._id}>
                                                {isReady && renderFunc(item)}
                                            </TabPanel>
                                        )
                                    })
                                }

                            </Tabs>
                        </div>
                        <div className="person-comment">
                            <p className="error-message-form">{validationFull ? validationFull : ""}</p>

                            <form onSubmit={(e) => sendComment(e)} action="#" name="comment-form" id="comment-form">
                                <textarea onChange={(e) => setComment(e.target.value)} name="comment-text" id="comment-text"
                                    placeholder="Ваш комменантарий. Насколько было сложно, больше и так далее">
                                </textarea>
                                <button type="submit" className="person-comment__btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.87717 0.711066C1.74216 0.64304 1.59092 0.61455 1.44065 0.628839C1.29037 0.643128 1.14709 0.699621 1.0271 0.791893C0.907118 0.884164 0.815244 1.00851 0.761933 1.15079C0.708622 1.29306 0.696014 1.44755 0.725543 1.59669L2.98847 9.47794C3.03066 9.62481 3.11313 9.75671 3.22641 9.85847C3.33968 9.96023 3.47915 10.0277 3.62879 10.0532L12.8063 11.6018C13.2386 11.6879 13.2386 12.3119 12.8063 12.3981L3.62879 13.9467C3.47915 13.9722 3.33968 14.0397 3.22641 14.1414C3.11313 14.2432 3.03066 14.3751 2.98847 14.5219L0.725543 22.4032C0.696014 22.5523 0.708622 22.7068 0.761933 22.8491C0.815244 22.9914 0.907118 23.1157 1.0271 23.208C1.14709 23.3003 1.29037 23.3568 1.44065 23.371C1.59092 23.3853 1.74216 23.3568 1.87717 23.2888L22.8451 12.7263C22.9789 12.6588 23.0913 12.555 23.17 12.4268C23.2486 12.2985 23.2902 12.1507 23.2902 11.9999C23.2902 11.8492 23.2486 11.7014 23.17 11.5731C23.0913 11.4448 22.9789 11.3411 22.8451 11.2736L1.87717 0.711066Z"
                                            fill="white" />
                                    </svg>
                                </button>
                            </form>

                            <button onClick={() => openFinishModal()} className="person-comment__true">Подтвердить
                            прохождение программы
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>

                <FeedBackModal
                    updateModal={updateModal}
                    isOpen={isOpenFeedback}
                    username={user.name}
                    email = {user.email}
                />

                <ModalCustom
                    title = {"Вы хотите написать отзыв по курсу?"}
                    buttonText = {"Да"}
                    buttonClick = {sendCourseFinish}
                    buttonTextSecond = {"Нет"}
                    updateModal = {updateModal}
                    isOpen={modalFinish}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    svg={true}
                />

                <ModalCustom
                    title = {"Лист назначений"}
                    buttonText = {"Скачать"}
                    updateModal = {updateModal}
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    buttonClick = {donwloadAttachment}
                    svg={true}
                />
            </div>
            <FooterBottom />
        </div>
    );
};

export default PersonArea;