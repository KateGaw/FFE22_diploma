import React from "react";
import { withRouter } from "react-router-dom";

const ProgressBar = (props) => {
  const current = props.location.pathname;
  const steps = [
    {
      step: "/tickets/seats",
      title: "Билеты",
    },
    {
      step: "/passengers",
      title: "Пассажиры",
    },
    {
      step: "/payment",
      title: "Оплата",
    },
    {
      step: "/confirm",
      title: "Проверка",
    },
  ];

  const isCurrent = (item, index) => {
    return (
      item.step.match(current) ||
      index <= steps.findIndex((item) => item.step === current)
    );
  };

  return (
    <section className="progress">
      {steps.map((item, index) => (
        <div
          key={item.title}
          className={`progress__step ${
            isCurrent(item, index) ? "progress__step-current" : ""
          }`}
        >
          <span className="number">{index + 1}</span>
          <span className="progress__text">{item.title}</span>
          {index === 3 ? null : (
            <div
              className={`progress__arrow ${
                isCurrent(item, index) ? "progress__arrow-current" : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </section>
  );
};

export default withRouter(ProgressBar);
