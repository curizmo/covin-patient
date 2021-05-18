import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";

const Medication = ({
  medication,
  setIntakeState,
  intakeState,
  patientDetails,
  hash,
  setPage,
  page,
  progressedPage,
  setProgressedPage,
}) => {
  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const onSubmit = async () => {
    await Promise.all([
      patientService.createPatientIntake({
        form: intakeState,
        patientId: patientDetails.patientId,
      }),
      patientService.UpdateMessageStatus(hash),
      patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: progressedPage,
      }),
    ]);

    setProgressedPage(progressedPage + 1);
    setPage(page + 1);

  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Medications</div>
      <div className="health-checklist">
        {medication.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "list-content"
                  : "input-history"
              }
              key={indx}
            >
              {history.type === "Text" && <label>{history.title}</label>}

              <input
                type="text"
                id={indx}
                name={history.field}
                onChange={handleInputChange}
              />
            </div>
          );
        })}
      </div>
      <button className="submit-button submit-btn" onClick={onSubmit}>
        SUBMIT
      </button>
    </div>
  );
};
export default Medication;
