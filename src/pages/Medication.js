import "../App.css";
import "./home.css";

const Medication = ({ medication, setIntakeState, intakeState }) => {
  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
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
    </div>
  );
};
export default Medication;
