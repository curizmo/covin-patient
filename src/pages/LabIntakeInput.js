import React, { useRef } from "react";
import { DECIMAL_REGEX, DATE_FORMAT } from "../constants/constants";

import "../App.css";
import "./home.css";

const moment = require("moment");

const decimalPlaceError = "Round to one decimal place (e.g. 23.1)";

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
    const item = e.target.name;
    const value = e.target.value;

    setLabState({ ...labState, [item]: value });
    // @toDo add validation
    // setLabError((errors) => ({
    //   ...errors,
    //   [item]: !(value === "" || value?.match(DECIMAL_REGEX)?.[0]),
    // }));
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
                {labError.crp ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
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
                {labError.esr ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
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
                {labError.dDimer ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
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
                {labError.ferritin ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
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
                {labError.ldh ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
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
                {labError.wbc ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
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
                  name="neutrophil"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["neutrophil"]}
                  ref={neutrophilRef}

                />
                <div className="lab-icon-left" onClick={()=>{neutrophilRef.current.focus()}}>%</div>
                {labError.neutrophil ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
              </div>
              <div>
                <label>Lymphocytes</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="lymphocytes"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["lymphocytes"]}
                  ref={lymphocytesRef}

                />
                <div className="lab-icon" onClick={()=>{lymphocytesRef.current.focus()}}>%</div>
                {labError.lymphocytes ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
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
                  name="eosinophils"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["eosinophils"]}
                  ref={eosinophilsRef}

                />
                <div className="lab-icon-left" onClick={()=>{eosinophilsRef.current.focus()}}>%</div>
                {labError.eosinophils ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
                ) : null}
              </div>
              <div>
                <label>Basophils</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="basophils"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["basophils"]}
                  ref={basopholsRef}

                />
                <div className="lab-icon" onClick={()=>{basopholsRef.current.focus()}}>%</div>
                {labError.basophils ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
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
                  inputMode="decimal"
                  name="platelets"
                  onBlur={handleLabInputChange}
                  defaultValue={labState["platelets"]}
                  ref={plateletsRef}

                />
                <div className="lab-icon-single" onClick={()=>{plateletsRef.current.focus()}}>%</div>
                {labError.platelets ? (
                  <p className="lab-error-message">{decimalPlaceError}</p>
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
