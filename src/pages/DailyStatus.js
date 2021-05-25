import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import "./home.css";
import { DAILY_STATUS } from "../constants/constants";

const DailyStatus = ({
  state,
  setState,
  setPage,
  page,
}) => {
  const [isSame, setIsSame] = useState(false);
  const [isBetter, setIsBetter] = useState(false);
  const [isWorse, setIsWorse] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const handleOnStatusClick = useCallback(
    (item) => () => {
      const newState = { ...state, statusToday: item };
      const isStatusChecked = Object.values(newState).some((s) => s);
      setState(newState);
      setStatusError(!isStatusChecked);
    },
    [state]
  );

  useEffect(() => {
    switch (state["statusToday"]) {
      case DAILY_STATUS.same:
        setIsSame(true);
        setIsBetter(false);
        setIsWorse(false);
        break;
      case DAILY_STATUS.better:
        setIsSame(false);
        setIsBetter(true);
        setIsWorse(false);
        break;
      case DAILY_STATUS.worse:
        setIsSame(false);
        setIsBetter(false);
        setIsWorse(true);
        break;
    }
  }, [state]);

  console.log(state);

  const onNext = async () => {
    if (!isSame && !isBetter && !isWorse) {
      setStatusError(true);
      return;
    } else setStatusError(false);

    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div>How are you feeling today?</div>
      <div className="health-checklist no-select">
        <div
          className="list-content symptoms-list"
          onClick={handleOnStatusClick(DAILY_STATUS.same)}
        >
          <input
            className="symptoms-checkbox"
            type="checkbox"
            name="Same"
            checked={isSame}
          />
          <label>Same</label>
        </div>
      </div>
      <div className="health-checklist no-select">
        <div
          className="list-content symptoms-list"
          onClick={handleOnStatusClick(DAILY_STATUS.better)}
        >
          <input
            className="symptoms-checkbox"
            type="checkbox"
            name="Better"
            checked={isBetter}
          />
          <label>Better</label>
        </div>
      </div>
      <div className="health-checklist no-select">
        <div
          className="list-content symptoms-list"
          onClick={handleOnStatusClick(DAILY_STATUS.worse)}
        >
          <input
            className="symptoms-checkbox"
            type="checkbox"
            name="Worse"
            checked={isWorse}
          />
          <label>Worse</label>
        </div>
      </div>
      {statusError ? (
        <span className="error-message">
          At least one field must be selected
        </span>
      ) : null}
      <button className="submit-button submit-btn" onClick={onNext}>
        NEXT
      </button>
    </div>
  );
};

export default DailyStatus;
