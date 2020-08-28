/*eslint-disable array-callback-return, react-hooks/exhaustive-deps*/

import React, { useState, useEffect } from "react";
import "./style.css";

const Block = ({ type, i, left, items, setItems, display, able }) => {
  const style =
    type === "top"
      ? i % 2 === 0
        ? {
            position: "absolute",
            display: display,
            top: "25px",
            left: `${left}%`,
          }
        : {
            position: "absolute",
            display: display,
            top: "51px",
            left: `${left}%`,
          }
      : {
          position: "absolute",
          display: display,
          top: "96px",
          left: `${left}%`,
        };
  const usual_class = type === "top" ? "top_block" : "bottom_block";
  const active_class = `${usual_class} active_block`;
  const unable_class = `${usual_class} unable`;

  const [active, setActive] = useState(false);

  const blockClickHandler = (event) => {
    if (able) {
      setActive(active ? false : true);
    }
  };

  useEffect(() => {
    if (active) {
      setItems([...items, i]);
    } else {
      setItems((c) => c.filter((item) => item !== i));
    }
  }, [active]);

  return (
    <div style={style}>
      <div
        className={able ? (active ? active_class : usual_class) : unable_class}
        id={i}
        onClick={blockClickHandler}
      >
        <p id={i}>{i}</p>
      </div>
    </div>
  );
};

const FourthClass = (props) => {
  const number = "07";
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    props.setSeats(selectedItems);
  }, [selectedItems]);

  const blocks = [
    { i: 1, left: 14.5, type: "top", display: true },
    { i: 2, left: 14.5, type: "top", display: true },
    { i: 3, left: 20.5, type: "top", display: true },
    { i: 4, left: 20.5, type: "top", display: true },
    { i: 5, left: 24.4, type: "top", display: true },
    { i: 6, left: 24.4, type: "top", display: true },
    { i: 7, left: 30.1, type: "top", display: true },
    { i: 8, left: 30.1, type: "top", display: true },
    { i: 9, left: 34, type: "top", display: true },
    { i: 10, left: 34, type: "top", display: true },
    { i: 11, left: 40, type: "top", display: true },
    { i: 12, left: 40, type: "top", display: true },
    { i: 13, left: 43.8, type: "top", display: true },
    { i: 14, left: 43.8, type: "top", display: true },
    { i: 15, left: 49.6, type: "top", display: true },
    { i: 16, left: 49.6, type: "top", display: true },
    { i: 17, left: 53.4, type: "top", display: true },
    { i: 18, left: 53.4, type: "top", display: true },
    { i: 19, left: 59.5, type: "top", display: true },
    { i: 20, left: 59.5, type: "top", display: true },
    { i: 21, left: 63.3, type: "top", display: true },
    { i: 22, left: 63.3, type: "top", display: true },
    { i: 23, left: 69.1, type: "top", display: true },
    { i: 24, left: 69.1, type: "top", display: true },
    { i: 25, left: 72.8, type: "top", display: true },
    { i: 26, left: 72.8, type: "top", display: true },
    { i: 27, left: 78.7, type: "top", display: true },
    { i: 28, left: 78.7, type: "top", display: true },
    { i: 29, left: 82.5, type: "top", display: true },
    { i: 30, left: 82.5, type: "top", display: true },
    { i: 31, left: 88.6, type: "top", display: true },
    { i: 32, left: 88.6, type: "top", display: true },

    { i: 33, left: 14.5, type: "bottom", display: true },
    { i: 34, left: 19.2, type: "bottom", display: true },
    { i: 35, left: 24.3, type: "bottom", display: true },
    { i: 36, left: 28.9, type: "bottom", display: true },
    { i: 37, left: 33.9, type: "bottom", display: true },
    { i: 38, left: 38.7, type: "bottom", display: true },
    { i: 39, left: 43.7, type: "bottom", display: true },
    { i: 40, left: 48.3, type: "bottom", display: true },
    { i: 41, left: 53.4, type: "bottom", display: true },
    { i: 42, left: 58.1, type: "bottom", display: true },
    { i: 43, left: 63.1, type: "bottom", display: true },
    { i: 44, left: 67.8, type: "bottom", display: true },
    { i: 45, left: 72.8, type: "bottom", display: true },
    { i: 46, left: 77.5, type: "bottom", display: true },
    { i: 47, left: 82.6, type: "bottom", display: true },
    { i: 48, left: 87.2, type: "bottom", display: true },
  ];

  console.log("fourth", props.data);
  props.data.map((item) => {
    if (blocks[item.index]) {
      blocks[item.index].available = item.available;
    }
  });

  if (props.data.length < 48) {
    blocks.map((item) => {
      if (item.i >= props.data.length + 1) {
        item.display = "none";
      } else {
        item.display = "block";
      }
    });
  }

  return (
    <div className="main_block fourth">
      <div className="block_number">{number}</div>
      {blocks.map((item) => (
        <Block
          type={item.type}
          key={item.i}
          i={item.i}
          left={item.left}
          display={item.display}
          able={item.available}
          items={selectedItems}
          setItems={setSelectedItems}
        />
      ))}
    </div>
  );
};

export default FourthClass;
