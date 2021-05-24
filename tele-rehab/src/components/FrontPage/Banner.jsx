import React, {useEffect, useState} from 'react';
const Banner = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [comment, setComment] = useState("");
    const [errorForm, setErrorForm] = useState(false);
    const [msg, setMsg] = useState("");

    function focusClick(e) {
        e.preventDefault();
        let nameLabel = document.getElementById("name-label");
        nameLabel.style.display = "none";
    }
    function focusPhoneClick(e){
        let phoneLabel = document.getElementById("phone-label");
        phoneLabel.style.display ="none";
    }
    function focusEmailClick(e){
        let emailLabel = document.getElementById("email-label");
        emailLabel.style.display ="none";
    }
    function onFocusClick(e){
        e.preventDefault();
        let inputName = document.getElementById("banner-name");
        if (inputName.value === ''){
            let nameLabel = document.getElementById("name-label");
            nameLabel.style.display = "block";
        }
    }
    function onFocusPhoneClick(e){
        e.preventDefault();
        let inputPhone = document.getElementById("banner-phone");
        if (inputPhone.value === ''){
            let phoneLabel = document.getElementById("phone-label");
            phoneLabel.style.display = "block";
        }
    }
    function onFocusEmailClick(e){
        e.preventDefault();
        let inputEmail = document.getElementById("banner-email");
        if (inputEmail.value === ''){
            let emailLabel = document.getElementById("email-label");
            emailLabel.style.display = "block";
        }
    }
    function sendForm(e){

    }
    async function submitForm(event){
        event.preventDefault();
        // console.log(11341);
        await setErrorForm(false);
        const formData = {
            name,
            phone,
            email,
            birthday,
            comment
        }
        var isError = false;
        for(let i in formData){
            if(formData[i] === ""){
                isError = true;
                await setErrorForm(true);
            }
        }
        await sendMessage(formData, isError);

    }

    async function sendMessage(formData, isError){
        if(!isError){
            await fetch(`http://localhost:3000/send`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify(formData)
            })
                .then(async (res) =>{ messageSuccess(); })
                .catch((err) => { console.log(err) })
        }
    }

    function messageSuccess(){
        setMsg("Форма успешно отправлена")
    }

  return (
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
                    <form onSubmit={(event)=>submitForm(event)} name="banner-form" id="banner-form">
                        <p className="form-banner__title">Пройти регистрацию</p>
                        <div className="form-item">
                            <div className="form-item__wrap">
                                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} id="banner-name" onFocus={focusClick} onBlur={onFocusClick} />
                                <label htmlFor="banner-name" id="name-label">ФИО <span>*</span></label>
                            </div>
                            <div className="form-item__wrap">
                                <input id="banner-phone" name="phone" type="tel" onChange={(e)=>setPhone(e.target.value)} onFocus={focusPhoneClick} onBlur={onFocusPhoneClick} />
                                <label htmlFor="banner-phone" id="phone-label">Номер телефона <span>*</span></label>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="form-item__wrap">
                                <input type="email" name="email" id="banner-email" onChange={(e)=>setEmail(e.target.value)} onFocus={focusEmailClick} onBlur={onFocusEmailClick}/>
                                <label htmlFor="banner-email" id="email-label">Email <span>*</span></label>
                            </div>
                            <div className="form-item__wrap">
                                <input type="date" name="birthday" onChange={(e)=>setBirthday(e.target.value)} id="banner-birthday" placeholder="Дата рождения" />
                            </div>
                        </div>
                        <textarea name="comment" id="banner-com" onChange={(e)=>setComment(e.target.value)} placeholder="Опишите диагноз"></textarea>
                        <p className="form-banner__attachment">Прикрепить файл <sup>*</sup> <span>максимум 15 мб</span></p>
                        <button className="btn form-banner__btn" type="submit">Зарегистрироваться</button>
                        <span className="form-banner__addition">После регистрации с вами свяжется специалист обсудит с вами проблемы и ее решение, предложит оптимальную программу</span>
                        {errorForm && !msg ? <span className="form-banner__addition error-message">Введите все поля пожалуйста</span> : <span className="form-banner__addition"></span>}
                        {msg ? <span className="form-banner__addition success-message">{msg}</span> : <span className="form-banner__addition"></span>}
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Banner;