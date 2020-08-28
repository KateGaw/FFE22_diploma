/*eslint-disable array-callback-return, react-hooks/exhaustive-deps*/

import React, { useState, useEffect } from "react";
import "./style.css";

const Block = ({ i, left, items, setItems, display, able }) => {
  const style =
    i % 2 === 0
      ? {
          position: "absolute",
          top: "25px",
          left: `${left}%`,
        }
      : {
          position: "absolute",
          top: "50.3px",
          left: `${left}%`,
        };
  const usual_class = "top_block";
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
        <span id={i}>{i}</span>
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
    { i: 1, left: 14.5 },
    { i: 2, left: 14.5 },
    { i: 3, left: 21.1 },
    { i: 4, left: 21.1 },
    { i: 5, left: 24.4 },
    { i: 6, left: 24.4 },
    { i: 7, left: 30.6 },
    { i: 8, left: 30.6 },
    { i: 9, left: 34 },
    { i: 10, left: 34 },
    { i: 11, left: 40.5 },
    { i: 12, left: 40.5 },
    { i: 13, left: 43.8 },
    { i: 14, left: 43.8 },
    { i: 15, left: 50.1 },
    { i: 16, left: 50.1 },
    { i: 17, left: 53.4 },
    { i: 18, left: 53.4 },
    { i: 19, left: 60 },
    { i: 20, left: 60 },
    { i: 21, left: 63.3 },
    { i: 22, left: 63.3 },
    { i: 23, left: 69.5 },
    { i: 24, left: 69.5 },
    { i: 25, left: 72.8 },
    { i: 26, left: 72.8 },
    { i: 27, left: 79.3 },
    { i: 28, left: 79.3 },
    { i: 29, left: 82.5 },
    { i: 30, left: 82.5 },
    { i: 31, left: 89.1 },
    { i: 32, left: 89.1 },
  ];

  props.data.map((item) => {
    if (blocks[item.index]) {
      blocks[item.index].available = item.available;
    }
  });

  if (props.data.length < 31) {
    blocks.map((item) => {
      if (item.i >= props.data.length + 1) {
        item.available = false;
      }
    });
  }

  return (
    <div className="main_block second">
      <div className="block_number">{number}</div>
      {blocks.map((item) => (
        <Block
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
