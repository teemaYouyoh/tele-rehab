import React from 'react';
const Banner = () => {
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
                    <form action="#" name="banner-form" id="banner-form">
                        <p className="form-banner__title">Пройти регистрацию</p>
                        <div className="form-item">
                            <div className="form-item__wrap">
                                <input type="text" id="banner-name" onFocus={focusClick} onBlur={onFocusClick} />
                                <label htmlFor="banner-name" id="name-label">ФИО <span>*</span></label>
                            </div>
                            <div className="form-item__wrap">
                                <input id="banner-phone" type="text"  onFocus={focusPhoneClick} onBlur={onFocusPhoneClick} />
                                <label htmlFor="banner-phone" id="phone-label">Номер телефона <span>*</span></label>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="form-item__wrap">
                                <input type="text" id="banner-email" onFocus={focusEmailClick} onBlur={onFocusEmailClick}/>
                                <label htmlFor="banner-email" id="email-label">Email <span>*</span></label>
                            </div>
                            <div className="form-item__wrap">
                                <input type="text" id="banner-birthday" placeholder="Дата рождения" />
                            </div>
                        </div>
                        <textarea name="banner-comment" id="banner-com" placeholder="Опишите диагноз"></textarea>
                        <p className="form-banner__attachment">Прикрепить файл <sup>*</sup> <span>максимум 15 мб</span></p>
                        <button className="btn form-banner__btn">Зарегистрироваться</button>
                        <span className="form-banner__addition">После регистрации с вами свяжется специалист обсудит с вами проблемы и ее решение, предложит оптимальную программу</span>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Banner;