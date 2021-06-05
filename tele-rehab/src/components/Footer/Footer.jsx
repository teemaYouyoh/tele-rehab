import React, {useState} from 'react';
import FooterBottom from './FooterBottom';


const Footer = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const sendMsg = async (e) => {
        e.preventDefault();
        if(name && phone){
            const formData = {
                name,
                phone
            }
            const response = await fetch(`https://tele-rehab-api.vps-touchit.space/send_call`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
    }

  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
      <div className="container">
        <div className="footer-wrap">
          <div className="footer-left">
            <p className="footer-title">Связаться  с нами</p>
            <div className="footer-left__wrap">
                <div className="footer-left__item">
                  <p>Номер телефона</p>
                  <a href="tel:+380990000000">+38 099 000 00 00</a>
                </div>
                <div className="footer-left__item">
                  <p>Email</p>
                  <a href="tel:+380990000000">telerehab@gmail.com</a>
                </div>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-title">Заказать обратный звонок</p>
            <div className="footer-form">
              <form onSubmit={(e)=>sendMsg(e)} name="footer-form" id="footer-form">
                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Имя" />
                <input type="text" onChange={(e)=>setPhone(e.target.value)} placeholder="Номер телефона" />
                <button type="submit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.4868 0.711188C1.35079 0.643162 1.19841 0.614672 1.04701 0.628961C0.895608 0.64325 0.751254 0.699743 0.63037 0.792015C0.509486 0.884286 0.416924 1.00863 0.363214 1.15091C0.309504 1.29318 0.296801 1.44768 0.326551 1.59681L2.60643 9.47806C2.64894 9.62494 2.73203 9.75683 2.84615 9.85859C2.96027 9.96035 3.10079 10.0278 3.25155 10.0533L12.4978 11.6019C12.9333 11.6881 12.9333 12.3121 12.4978 12.3982L3.25155 13.9468C3.10079 13.9723 2.96027 14.0398 2.84615 14.1415C2.73203 14.2433 2.64894 14.3752 2.60643 14.5221L0.326551 22.4033C0.296801 22.5525 0.309504 22.7069 0.363214 22.8492C0.416924 22.9915 0.509486 23.1158 0.63037 23.2081C0.751254 23.3004 0.895608 23.3569 1.04701 23.3712C1.19841 23.3855 1.35079 23.357 1.4868 23.2889L22.6118 12.7264C22.7466 12.6589 22.8599 12.5552 22.9391 12.4269C23.0183 12.2986 23.0602 12.1508 23.0602 12.0001C23.0602 11.8493 23.0183 11.7015 22.9391 11.5732C22.8599 11.445 22.7466 11.3412 22.6118 11.2737L1.4868 0.711188Z" fill="white"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;