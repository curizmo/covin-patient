import React from "react";
import "../App.css";

const PatientChecklist = () => {
  const checkList = [
    "Fever or Chills",
    "Cough",
    "Difficulty Breathing",
    "Fatigue, Muscle or body aches",
    "Headache",
    "New loss of taste or smell",
    "Sore throat",
    "Congestion or runny nose",
    "Nausea or Vomiting",
    "Diarrhea",
    "None of the above",
  ];
  return (
    <div className="form-content-wrapper">
      <div>Are you currently having any of the following symptoms?</div>
      <div className="health-checklist">
        {checkList.map((list) => {
          return (
            <div className="list-content">
              <input type="checkbox" id={list} value={list} />
              <label for={list} key={list.key}>
                {" "}
                {list}
              </label>
            </div>
          );
        })}
        <div>
          <label>Since when did you have the symptoms?</label>
          <textarea cols="39" rows="5"></textarea>
        </div>
      </div>
    </div>
  );
};

export default PatientChecklist;
