import React from 'react';
import FrontPageHeader from '../Header/FrontPageHeader';
import Banner from './Banner';
import About from './About';
import Questions from './Questions';
import Footer from '../Footer/Footer';

const FrontPage = () => {
  return (
    <div className="front-page">
      <div className="banner">
          <FrontPageHeader />
          <Banner />
      </div>
      <About />
      <Questions />
      <Footer />
    </div>
  );
};

export default FrontPage;