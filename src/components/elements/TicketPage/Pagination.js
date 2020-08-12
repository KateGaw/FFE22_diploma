import React, { useState } from "react";

const Pagination = ({ max, info, setInfo }) => {
  const [pagePrevDisabled, setPagePrevDisabled] = useState(true);
  const [pageNextDisabled, setPageNextDisabled] = useState(false);
  let pages = Math.ceil(Number(max) / Number(info.limit));
  let buttonsPages = [];

  const numButtonClickHandler = (event) => {
    setInfo({
      ...info,
      offset: Number(info.limit) * Number(event.target.id) - Number(info.limit),
    });

    let pages = Math.ceil(Number(max) / Number(info.limit));

    if (pages === Number(event.target.id)) {
      setPagePrevDisabled(false);
      setPageNextDisabled(true);
    } else if (Number(event.target.id) === 1) {
      setPagePrevDisabled(true);
      setPageNextDisabled(false);
    } else {
      setPagePrevDisabled(false);
      setPageNextDisabled(false);
    }
  };

  const prevPageOffsetHandler = () => {
    if (Number(info.offset) / Number(info.limit) === 1) {
      setPagePrevDisabled(true);
    }
    setInfo({
      ...info,
      offset: info.offset - Number(info.limit),
    });
    setPageNextDisabled(false);
  };

  const nextPageOffsetHandler = () => {
    let pages = Math.ceil(Number(max) / Number(info.limit));
    if (pages === info.offset / Number(info.limit) + 2) {
      setPageNextDisabled(true);
    }
    if (pages >= info.offset / Number(info.limit) - 2) {
      setPagePrevDisabled(false);
    }
    setInfo({
      ...info,
      offset: info.offset + Number(info.limit),
    });
  };

  for (let i = 1; i <= pages; i++) {
    buttonsPages.push(
      <button
        className={
          info.offset / Number(info.limit) + 1 === i
            ? "button_page btn active_btn"
            : "button_page btn"
        }
        key={i}
        id={i}
        onClick={numButtonClickHandler}
      >
        {i}
      </button>
    );
  }
  return (
    <div className="pagination_block">
      <button
        className="prev_button btn"
        onClick={prevPageOffsetHandler}
        disabled={pagePrevDisabled}
      >
        <img src="assets/prev.svg" alt="prev" />
      </button>

      {buttonsPages}

      <button
        className="next_button btn"
        onClick={nextPageOffsetHandler}
        disabled={pageNextDisabled}
      >
        <img src="assets/next.svg" alt="next" />
      </button>
    </div>
  );
};

export default Pagination;
