import React, { useState, useEffect } from "react";
import "../App.css";
import "./home.css";

const PeexistingCondition = ({ preexistingCondition }) => {
  const handleOnChange = (event) => {};

  return (
    <div className="form-content-wrapper">
      <div>
      Pre-existing Conditions
    </div>
    <div className="health-checklist">
      {preexistingCondition.map((history, indx) => {
        return (
          <div
            className={
              `${history.type}` === "Boolean"
                ? "preexisting-list-content"
                : "input-history"
            }
            key={indx}
          >
            {history.type === "Text" && <label>{history.title}</label>}
            <input
              className={
                `${history.type}` === "Boolean" ? "symptoms-checkbox" : ""
              }
              type={`${history.type}` === "Boolean" ? "checkbox" : "text"}
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

export default PeexistingCondition;
