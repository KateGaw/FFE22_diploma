import React from "react";

const Rewiews = () => {
  return (
    <div className="main_reviews" id="rewiews">
      <h3>отзывы</h3>
      <div className="reviews">
        <div className="review">
          <img src="/assets/reviews/image_1.png" alt="review_1" />
          <div className="review_text">
            <h5>Екатерина Вальнова</h5>
            <p>
              <b>“</b>
              Доброжелательные подсказки на всех этапах помогут правильно
              заполнить поля и без затруднений купить авиа или ж/д билет, даже
              если вы заказываете онлайн билет впервые.
              <sub>
                <b>”</b>
              </sub>
            </p>
          </div>
        </div>
        <div className="review">
          <img src="/assets/reviews/image_2.png" alt="review_2" />
          <div className="review_text">
            <h5>Евгений Стрыкало</h5>
            <p>
              <b>“</b>
              СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3
              часа до отправления мы пришлем вам СМС-напоминание о поездке.
              <sub>
                <b>”</b>
              </sub>
            </p>
          </div>
        </div>
      </div>
      <div className="controls">
        <div className="control active" />
        <div className="control" />
        <div className="control" />
        <div className="control" />
        <div className="control" />
      </div>
    </div>
  );
};

export default Rewiews;
