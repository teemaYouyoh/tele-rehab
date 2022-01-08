import React from 'react';

const FooterBottom = () => {

  const crrntYear = new Date().getFullYear();

  return (
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-wrapper">
            <div className="footer-rules">
              <p>© 2016 - {crrntYear}. TeleRehab</p>
              <p>Все права защищены.</p>
            </div>
            <div className="footer-dev">
              <p>Сайт разработан компанией <a href="https://impulse-design.com.ua/" rel="nofollow noreferrer" target="_blank">impulse-design.com.ua</a></p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FooterBottom;