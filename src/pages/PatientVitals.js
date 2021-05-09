import React, { useState, useEffect } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import Submission from "./Submission";

const PatientVitals = () => {
  const [page, setPage] = useState(1);

  const FOLLOWING_STATUS = {
    pageNum: page,
  };

  const onSubmit = () => {
    console.log("submitted");
    setPage(page + 1);
  };

  const onclose = () => {
    console.log("closed");
  };

  return (
    <div>
      <div className="header-wrapper">
        <div>Name: Amit shah</div>
        <div>Phone: +91982134576</div>
      </div>

      <div className="content-wrapper">
        <div className="form-wrapper">
          {FOLLOWING_STATUS.pageNum === 1 && <PatientChecklist />}
          {FOLLOWING_STATUS.pageNum === 2 && <PatientVitalForm />}
          {FOLLOWING_STATUS.pageNum === 3 && <Submission />}
        </div>

        {FOLLOWING_STATUS.pageNum === 1 ? (
          <button
            className="submit-button"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        ) : FOLLOWING_STATUS.pageNum === 2 ? (
          <button className="submit-button" onClick={onSubmit}>
            Submit
          </button>
        ) : (
          <button className="submit-button" onClick={onclose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientVitals;
