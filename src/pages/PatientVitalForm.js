import React , {useState} from "react";
import help_icon from "../assets/images/help-circle.svg";
import "../App.css";
import Modal from './HelpVideoModal';

const PatientVitalForm = ({
  setTemperature,
  setOxygenLevel,
  setPulseRate,
  setBpUpperRange,
  setBpLowerRange,
  setRespiratoryRate,
}) => {

  const [show, setShow] = useState(false)

  return (
    <div className="form-content-wrapper">
      <div className="input-vitals">
        <label>Oxygen Level</label>
        <div className="input-wrap">
          <input
            className="oxygen-input"
            type="text"
            name="OxygenLevel"
            onChange={(e) => setOxygenLevel(e.target.value)}
          />
          <div className="icon">%</div>
          <img className="help-icon" src={help_icon} alt="help icon" onClick = { () => setShow(true)}/>
        </div>
      </div>
      <Modal onClose = { () => setShow(false) } show={ show }/>
      <div className="input-vitals">
        <label>Temperature</label>
        <div className="input-wrap">
          <input
            type="text"
            name="Temperature"
            onChange={(e) => setTemperature(e.target.value)}
          />
          <div className="icon">°F</div>
          <img className="help-icon" src={help_icon} alt="help icon" onClick = { () => setShow(true)}/>
        </div>
      </div>
      <div className="input-vitals">
        <label>Pulse rate</label>
        <div className="input-wrap">
          <input
            type="text"
            name="Pulserate"
            onChange={(e) => setPulseRate(e.target.value)}
          />
          <div className="icon">Bpm</div>
          <img className="help-icon" src={help_icon} alt="help icon" onClick = { () => setShow(true)}/>
        </div>
      </div>
      <div className="input-vitals">
        <label>Blood Pressure</label>
        <div className="input-wrap">
          <div className="blood-pressure">
            <input
              className="bp"
              type="text"
              name="BloodPressureHigh"
              onChange={(e) => setBpUpperRange(e.target.value)}
            />
            <div className="icon-higher">Higher</div>
            <input
              className="bp bp-lower"
              type="text"
              name="BloodPressureLow"
              onChange={(e) => setBpLowerRange(e.target.value)}
            />
            <div className="icon-lower">Lower</div>
          </div>
          <img className="help-icon" src={help_icon} alt="help icon" onClick = { () => setShow(true)}/>
        </div>
      </div>
      <div className="input-vitals">
        <label>Respiratory Rate</label>
        <div className="input-wrap">
          <input
            type="text"
            name="respiratoryRate"
            onChange={(e) => setRespiratoryRate(e.target.value)}
          />
          <div className="icon">Breaths</div>
          <img className="help-icon" src={help_icon} alt="help icon" onClick = { () => setShow(true)}/>
        </div>
      </div>
    </div>
  );
};

export default PatientVitalForm;
