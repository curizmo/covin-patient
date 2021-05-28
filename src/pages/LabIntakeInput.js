import React, { useRef } from "react";
import { DATE_FORMAT } from "../constants/constants";

import "../App.css";
import "./home.css";

const moment = require("moment");

const percentError = "Value should be between 0 and 100";

const LabIntakeInput = ({ labState, setLabState, labError, setLabError }) => {
  const crpRef = useRef();
  const esrRef = useRef();
  const dDimerRef = useRef();
  const ferritinRef = useRef();
  const ldhRef = useRef();
  const wbcRef = useRef();
  const neutrophilRef = useRef();
  const lymphocytesRef = useRef();
  const eosinophilsRef = useRef();
  const basopholsRef = useRef();
  const plateletsRef = useRef();

  const handleLabInputChange = (e) => {
    const { name: item, value, min, max} = e.target;

    setLabError(state => ({ ...state, [item]: (min && +value < +min) || (max && +value > +max) }));
    setLabState({ ...labState, [item]: value });
    console.log("@toDo add validation", setLabError);
  };

  return (
    <>
      <div className="health-checklist">
        <div className="lab-input">
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>CRP</label>
                <input
                  className="bp"
                  type="number"
                  inputMode="decimal"
                  name="crp"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["crp"]}
                  ref={crpRef}
                />
                <div className="lab-icon-left-intake" onClick={()=>{crpRef.current.focus()}}>mg/L</div>
              </div>
              <div>
                <label>ESR</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="esr"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["esr"]}
                  ref={esrRef}

                />
                <div className="lab-icon" onClick={()=>{esrRef.current.focus()}}>mm/h</div>
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>D-dimer</label>
                <input
                  className="bp"
                  type="number"
                  inputMode="decimal"
                  name="dDimer"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["dDimer"]}
                  ref={dDimerRef}

                />
                <div className="lab-icon-left-intake" onClick={()=>{dDimerRef.current.focus()}}>ng/ml</div>
              </div>
              <div>
                <label>Ferritin</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="ferritin"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["ferritin"]}
                  ref={ferritinRef}
                />
                <div className="lab-icon" onClick={()=>{ferritinRef.current.focus()}}> ng/ml</div>
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>LDH</label>
                <input
                  className="bp"
                  type="number"
                  inputMode="decimal"
                  name="ldh"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["ldh"]}
                  ref={ldhRef}
                />
                <div className="lab-icon-ldh" onClick={()=>{ldhRef.current.focus()}}>U/L</div>
              </div>
              <div>
                <label>WBC</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="wbc"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["wbc"]}
                  ref={wbcRef}
                />
                <div className="lab-icon" onClick={()=>{wbcRef.current.focus()}}>/mm3</div>
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>Neutrophil</label>
                <input
                  className="bp"
                  type="number"
                  inputMode="decimal"
                  min='0'
                  max='100'
                  name="neutrophil"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["neutrophil"]}
                  ref={neutrophilRef}
                />
                <div className="lab-icon-left" onClick={()=>{neutrophilRef.current.focus()}}>%</div>
                {labError.neutrophil ? (
                  <p className="lab-error-message">{percentError}</p>
                ) : null}
              </div>
              <div>
                <label>Lymphocytes</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  min='0'
                  max='100'
                  name="lymphocytes"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["lymphocytes"]}
                  ref={lymphocytesRef}
                />
                <div className="lab-icon" onClick={()=>{lymphocytesRef.current.focus()}}>%</div>
                {labError.lymphocytes ? (
                  <p className="lab-error-message">{percentError}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>Eosinophils</label>
                <input
                  className="bp"
                  type="number"
                  inputMode="decimal"
                  min='0'
                  max='100'
                  name="eosinophils"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["eosinophils"]}
                  ref={eosinophilsRef}
                />
                <div className="lab-icon-left" onClick={()=>{eosinophilsRef.current.focus()}}>%</div>
                {labError.eosinophils ? (
                  <p className="lab-error-message">{percentError}</p>
                ) : null}
              </div>
              <div>
                <label>Basophils</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  min='0'
                  max='100'
                  name="basophils"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["basophils"]}
                  ref={basopholsRef}
                />
                <div className="lab-icon" onClick={()=>{basopholsRef.current.focus()}}>%</div>
                {labError.basophils ? (
                  <p className="lab-error-message">{percentError}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap-single">
            <div className="lab-vitals">
              <div className="single-intake">
                <label>Platelets</label>
                <input
                  className="platelets"
                  type="number"
                  min='0'
                  max='100'
                  inputMode="decimal"
                  name="platelets"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["platelets"]}
                  ref={plateletsRef}
                />
                <div className="lab-icon-single" onClick={()=>{plateletsRef.current.focus()}}>%</div>
                {labError.platelets ? (
                  <p className="lab-error-message">{percentError}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label>Lab specimen drawn on</label>
          <input
            name="specimenDrawnDate"
            className="date-of-lab-test"
            type="date"
            placeholder="Select date of diagnosis"
            max={moment().format(DATE_FORMAT.yyyymmdd)}
            value={moment(labState["specimenDrawnDate"]).format(
              DATE_FORMAT.yyyymmdd
            )}
            onChange={handleLabInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default LabIntakeInput;
