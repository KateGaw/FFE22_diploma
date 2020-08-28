/*eslint-disable array-callback-return, react-hooks/exhaustive-deps*/

import React, { useState, useEffect } from "react";
import "./style.css";

const Block = ({ type, i, left, items, setItems, able }) => {
  const style =
    type === "top"
      ? i % 2 === 0
        ? {
            position: "absolute",
            top: "25px",
            left: `${left}%`,
          }
        : {
            position: "absolute",
            top: "51px",
            left: `${left}%`,
          }
      : {
          position: "absolute",
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
    { i: 1, left: 14.5, type: "top" },
    { i: 2, left: 14.5, type: "top" },
    { i: 3, left: 20.5, type: "top" },
    { i: 4, left: 20.5, type: "top" },
    { i: 5, left: 24.4, type: "top" },
    { i: 6, left: 24.4, type: "top" },
    { i: 7, left: 30.1, type: "top" },
    { i: 8, left: 30.1, type: "top" },
    { i: 9, left: 34, type: "top" },
    { i: 10, left: 34, type: "top" },
    { i: 11, left: 40, type: "top" },
    { i: 12, left: 40, type: "top" },
    { i: 13, left: 43.8, type: "top" },
    { i: 14, left: 43.8, type: "top" },
    { i: 15, left: 49.6, type: "top" },
    { i: 16, left: 49.6, type: "top" },
    { i: 17, left: 53.4, type: "top" },
    { i: 18, left: 53.4, type: "top" },
    { i: 19, left: 59.5, type: "top" },
    { i: 20, left: 59.5, type: "top" },
    { i: 21, left: 63.3, type: "top" },
    { i: 22, left: 63.3, type: "top" },
    { i: 23, left: 69.1, type: "top" },
    { i: 24, left: 69.1, type: "top" },
    { i: 25, left: 72.8, type: "top" },
    { i: 26, left: 72.8, type: "top" },
    { i: 27, left: 78.7, type: "top" },
    { i: 28, left: 78.7, type: "top" },
    { i: 29, left: 82.5, type: "top" },
    { i: 30, left: 82.5, type: "top" },
    { i: 31, left: 88.6, type: "top" },
    { i: 32, left: 88.6, type: "top" },

    { i: 33, left: 14.5, type: "bottom" },
    { i: 34, left: 19.2, type: "bottom" },
    { i: 35, left: 24.3, type: "bottom" },
    { i: 36, left: 28.9, type: "bottom" },
    { i: 37, left: 33.9, type: "bottom" },
    { i: 38, left: 38.7, type: "bottom" },
    { i: 39, left: 43.7, type: "bottom" },
    { i: 40, left: 48.3, type: "bottom" },
    { i: 41, left: 53.4, type: "bottom" },
    { i: 42, left: 58.1, type: "bottom" },
    { i: 43, left: 63.1, type: "bottom" },
    { i: 44, left: 67.8, type: "bottom" },
    { i: 45, left: 72.8, type: "bottom" },
    { i: 46, left: 77.5, type: "bottom" },
    { i: 47, left: 82.6, type: "bottom" },
    { i: 48, left: 87.2, type: "bottom" },
  ];

  props.data.map((item) => {
    if (blocks[item.index]) {
      blocks[item.index].available = item.available;
    }
  });

  if (props.data.length < 48) {
    blocks.map((item) => {
      if (item.i >= props.data.length + 1) {
        item.available = false;
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
          able={item.available}
          items={selectedItems}
          setItems={setSelectedItems}
        />
      ))}
    </div>
  );
};

export default FourthClass;
