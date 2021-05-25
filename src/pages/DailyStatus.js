import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../App.css";
import "./home.css";
import { DAILY_STATUS } from "../constants/constants";

const DailyStatus = ({ state, setState, setPage, page }) => {
  const [statusError, setStatusError] = useState(false);

  const getIsStatusChecked = (state) => Object.values(state).some((s) => s);
  const handleOnStatusClick = useCallback(
    (item) => () => {
      const newState = { ...state, statusToday: item };
      const isStatusChecked = getIsStatusChecked(newState);
      setState(newState);
      setStatusError(!isStatusChecked);
    },
    [state]
  );

  const onNext = useCallback(async () => {
    const statusError = !getIsStatusChecked(state) || !state["statusToday"];
    setStatusError(statusError);

    if (statusError) {
      setStatusError(true);
      return;
    } else {
      setStatusError(false);
      setPage(page + 1);
    }
  }, [state, page]);

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
            checked={state["statusToday"] === DAILY_STATUS.same}
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
            checked={state["statusToday"] === DAILY_STATUS.better}
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
            checked={state["statusToday"] === DAILY_STATUS.worse}
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
