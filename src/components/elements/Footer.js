import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contacts">
        <div className="contact_us">
          <h5>Свяжитесь с нами</h5>
          <div className="contact">
            <img src="/assets/footer/phone.png" alt="phone" />
            <p>8 (800) 000 00 00</p>
          </div>
          <div className="contact">
            <img src="/assets/footer/mail.png" alt="mail" />
            <p>inbox@mail.ru</p>
          </div>
          <div className="contact">
            <img src="/assets/footer/skype.png" alt="skype" />
            <p>tu.train.tickets</p>
          </div>
          <div className="contact">
            <img src="/assets/footer/location.png" alt="location" />
            <p>
              г. Москва <br /> ул. Московская 27-35 555 555
            </p>
          </div>
        </div>

        <div className="subscription">
          <h5>Подписка</h5>
          <form className="subscription_form">
            <p>Будьте в курсе событий</p>
            <input type="email" placeholder="e-mail" />
            <button type="submit">Отправить</button>
          </form>
          <div className="subscription_social">
            <h5>Подписывайтесь на нас</h5>
            <div className="social_icons">
              <img src="/assets/footer/youtube.png" alt="youtube" />
              <img src="/assets/footer/instagram.png" alt="instagram" />
              <img src="/assets/footer/google_plus.png" alt="google_plus" />
              <img src="/assets/footer/facebook.png" alt="facebook" />
              <img src="/assets/footer/twitter.png" alt="twitter" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="logo">Лого</div>
        <img src="/assets/up.png" alt="up" />
        <div>2018 WEB</div>
      </div>
    </div>
  );
};

export default Footer;
