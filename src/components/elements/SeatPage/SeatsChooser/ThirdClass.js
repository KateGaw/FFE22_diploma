/*eslint-disable array-callback-return, react-hooks/exhaustive-deps*/

import React, { useState, useEffect } from "react";
import "./style.css";

const Block = ({ type, i, left, items, setItems, display, able }) => {
  let style;
  if (type === "top") {
    if (i % 2 === 0) {
      style = {
        position: "absolute",
        display: display,
        top: "36px",
        left: `${left}%`,
      };
    } else {
      style = {
        position: "absolute",
        display: display,
        top: "61px",
        left: `${left}%`,
      };
    }
  } else {
    if (i % 2 === 0) {
      style = {
        position: "absolute",
        display: display,
        top: "105px",
        left: `${left}%`,
      };
    } else {
      style = {
        position: "absolute",
        display: display,
        top: "127px",
        left: `${left}%`,
      };
    }
  }

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
    { i: 1, left: 16, type: "top", display: true },
    { i: 2, left: 16, type: "top", display: true },
    { i: 3, left: 20.7, type: "top", display: true },
    { i: 4, left: 20.7, type: "top", display: true },
    { i: 5, left: 25.4, type: "top", display: true },
    { i: 6, left: 25.4, type: "top", display: true },
    { i: 7, left: 30.1, type: "top", display: true },
    { i: 8, left: 30.1, type: "top", display: true },
    { i: 9, left: 34.8, type: "top", display: true },
    { i: 10, left: 34.8, type: "top", display: true },
    { i: 12, left: 39.5, type: "top", display: true },
    { i: 11, left: 39.5, type: "top", display: true },
    { i: 13, left: 44.2, type: "top", display: true },
    { i: 14, left: 44.2, type: "top", display: true },
    { i: 15, left: 48.9, type: "top", display: true },
    { i: 16, left: 48.9, type: "top", display: true },
    { i: 17, left: 53.6, type: "top", display: true },
    { i: 18, left: 53.6, type: "top", display: true },
    { i: 19, left: 58.3, type: "top", display: true },
    { i: 20, left: 58.3, type: "top", display: true },
    { i: 21, left: 63, type: "top", display: true },
    { i: 22, left: 63, type: "top", display: true },
    { i: 23, left: 67.7, type: "top", display: true },
    { i: 24, left: 67.7, type: "top", display: true },
    { i: 25, left: 72.4, type: "top", display: true },
    { i: 26, left: 72.4, type: "top", display: true },
    { i: 27, left: 77.1, type: "top", display: true },
    { i: 28, left: 77.1, type: "top", display: true },
    { i: 29, left: 81.8, type: "top", display: true },
    { i: 30, left: 81.8, type: "top", display: true },
    { i: 31, left: 86.5, type: "top", display: true },
    { i: 32, left: 86.5, type: "top", display: true },

    { i: 33, left: 16, type: "bottom", display: true },
    { i: 34, left: 20.7, type: "bottom", display: true },
    { i: 35, left: 20.7, type: "bottom", display: true },
    { i: 36, left: 25.4, type: "bottom", display: true },
    { i: 37, left: 25.4, type: "bottom", display: true },
    { i: 38, left: 30.1, type: "bottom", display: true },
    { i: 39, left: 30.1, type: "bottom", display: true },
    { i: 40, left: 34.8, type: "bottom", display: true },
    { i: 41, left: 34.8, type: "bottom", display: true },
    { i: 42, left: 39.5, type: "bottom", display: true },
    { i: 43, left: 39.5, type: "bottom", display: true },
    { i: 44, left: 44.2, type: "bottom", display: true },
    { i: 45, left: 44.2, type: "bottom", display: true },
    { i: 46, left: 48.9, type: "bottom", display: true },
    { i: 47, left: 48.9, type: "bottom", display: true },
    { i: 48, left: 53.6, type: "bottom", display: true },
    { i: 49, left: 53.6, type: "bottom", display: true },
    { i: 50, left: 58.3, type: "bottom", display: true },
    { i: 51, left: 58.3, type: "bottom", display: true },
    { i: 52, left: 63, type: "bottom", display: true },
    { i: 53, left: 63, type: "bottom", display: true },
    { i: 54, left: 67.7, type: "bottom", display: true },
    { i: 55, left: 67.7, type: "bottom", display: true },
    { i: 56, left: 72.4, type: "bottom", display: true },
    { i: 57, left: 72.4, type: "bottom", display: true },
    { i: 58, left: 77.1, type: "bottom", display: true },
    { i: 59, left: 77.1, type: "bottom", display: true },
    { i: 60, left: 81.8, type: "bottom", display: true },
    { i: 61, left: 81.8, type: "bottom", display: true },
    { i: 62, left: 86.5, type: "bottom", display: true },
  ];

  props.data.map((item) => {
    if (blocks[item.index]) {
      blocks[item.index].available = item.available;
    }
  });

  if (props.data.length < 62) {
    blocks.map((item) => {
      if (item.i >= props.data.length + 1) {
        item.display = "none";
      } else {
        item.display = "block";
      }
    });
  }

  return (
    <div className="main_block third">
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
