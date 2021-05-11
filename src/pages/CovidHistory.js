import React, { useState, useEffect } from "react";
import "../App.css";
import "./home.css";

const CovidHistory = ({ covidHistory }) => {
  console.log(covidHistory);
  const handleOnChange = (event) => {
    console.log(event);
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">
        Covid History
      </div>
      <div className="health-checklist">
        {covidHistory.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "history-list-content"
                  : "input-history"
              }
              key={indx}
            >
              {history.type === "Text" && <label>{history.title}</label>}
              <input
                className={
                  `${history.type}` === "Boolean" ? "symptoms-checkbox" : ""
                }
                type={`${history.type}` === "Boolean" ? "checkbox" : "date"}
                id={indx}
                value={`${history.type}` === "Boolean" ? history.field : ""}
                name={`${history.type}` === "Text" ? history.field : ""}
                onChange={handleOnChange}
              />
              {history.type === "Boolean" && <label>{history.title}</label>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CovidHistory;
