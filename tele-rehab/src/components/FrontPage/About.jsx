import React from 'react';
import about from '../../img/About/about-photo.png'
const About = () => {
  return (
    <div className="about">
        <div className="container">
            <div className="about-wrap">
                <div className="about-photo">
                    <img src={about} alt="about photo" />
                </div>
                <div className="about-info">
                    <h2 className="about-info__title">О проекте Tele Rehab</h2>
                    <p className="about-info__text">Более детальное но краткое описание что это за сайт и чем он может помочь пользователю. Более детальное но краткое описание что это за сайт и чем 
                    он может помочь пользователю Более детальное но краткое описаниечто это за сайт и чем он может помочь пользователю.</p>
                    <p className="about-info__text">Более детальное но краткое описание что это за сайт и чем он может помочь пользователю. Более детальное но краткое описание что это за сайт и чем он может помочь пользователю Более детальное но краткое описаниечто это за сайт и чем он может помочь пользователю.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;