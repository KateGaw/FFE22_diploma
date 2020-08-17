import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Loader = () => {
  return (
    <div className="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [messageText, setMessageText] = useState("");
  const subscriptionClickHandler = (event) => {
    event.preventDefault();
    setValid(true);
    const emailRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    if (emailRegExp.test(email)) {
      setLoader(true);
      api.setEmail(email, setResult, setLoader);
      setEmail("");
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    if (!loader && result.status !== undefined) {
      if (result.status) {
        setMessageText("Подписка оформлена!");
      } else {
        setMessageText("Произошла ошибка, попробуйте позже.");
      }
    }
  }, [result, loader]);

  return (
    <div className="footer" id="contacts">
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
            {loader ? (
              <Loader />
            ) : (
              <>
                <input
                  className={valid ? "" : "error_output"}
                  type="text"
                  placeholder="e-mail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" onClick={subscriptionClickHandler}>
                  Отправить
                </button>
                {result.status !== undefined && <span>{messageText}</span>}
              </>
            )}
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
        <a href="#header">
          <img src="/assets/up.png" alt="up" />
        </a>
        <div>2018 WEB</div>
      </div>
    </div>
  );
};

export default Footer;
