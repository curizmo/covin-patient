import React from "react";
import "../App.css";

const PatientChecklist = ({ state, setState, setSymptomsDuration }) => {
  const checkList = {
    "Fever or Chills": "feverOrChills",
    Cough: "cough",
    "Difficulty Breathing": "difficultyBreathing",
    "Fatigue, Muscle or body aches": "fatigueMuscleOrBodyAches",
    Headache: "headache",
    "New loss of taste or smell": "newlossOfTasteOrSmell",
    "Sore throat": "soreThroat",
    "Congestion or runny nose": "congestionOrRunnyNose",
    "Nausea or Vomiting": "nauseaOrVomiting",
    Diarrhea: "diarrhea",
    "None of the above": "none",
  };

  const handleOnChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    setState({ ...state, [`${item}`]: isChecked });
  };

  return (
    <div className="form-content-wrapper">
      <div>Are you currently having any of the following symptoms?</div>
      <div className="health-checklist">
        {Object.entries(checkList).map(([list, val], indx) => {
          return (
            <div className="list-content" key={indx}>
              <input
                type="checkbox"
                id={indx}
                value={val}
                onChange={handleOnChange}
              />
              <label key={list.key}>{list}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientChecklist;
