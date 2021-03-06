import React, { useState, useEffect, useRef } from "react";
import { DATE_FORMAT } from "../constants/constants";

import "../App.css";
import "./home.css";

const moment = require("moment");

const percentError = "Value must be between 0 and 100";

const LabIntakeInput = ({ labState, setLabState, labError, setLabError, disableInput }) => {
  const [dateclassName, setDateClassName] = useState("")
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
  const fbsRef = useRef();
  const ppbsRef = useRef();

  const handleLabInputChange = (e) => {
    const { name: item, value, min, max} = e.target;    

    setLabError(state => ({ ...state, [item]: (min && +value < +min) || (max && +value > +max) }));
    setLabState({ ...labState, [item]: value });
    console.log("@toDo add validation", setLabError);   
    if(item === "specimenDrawnDate"){
      setDateClassName(value ? "has-value" : "")
    } 
  };

  useEffect(() => {
    if (labState["specimenDrawnDate"] !== ""){
      setDateClassName(`has-value`)
    }
  }, [])

  return (
    <>
      <div className="health-checklist">
        <div className="lab-date-input">
            <label>Lab specimen drawn on <span className="required-field">*</span></label>
              <input
                name="specimenDrawnDate"
                className={`date-of-lab-test ${dateclassName}`}
                type="date"
                placeholder={DATE_FORMAT.mmddyyyy}
                max={moment().format(DATE_FORMAT.yyyymmdd)}
                value={moment(labState["specimenDrawnDate"]).format(
                  DATE_FORMAT.yyyymmdd
                )}
                onChange={handleLabInputChange}                 
              />
        </div>
        <div className="lab-input">
          <div className="blood-sugar-input-wrap">
            <div className="lab-vitals">
              <div>
                <label className="blood-sugar-label"><span>Blood Sugar</span> <span>Fasting (FBS)</span></label>
                <input
                  className="bp"
                  type="number"
                  inputMode="decimal"
                  name="fbs"
                  onBlur={handleLabInputChange}
                  disabled={disableInput}
                  defaultValue={labState["fbs"]}
                  ref={fbsRef}
                />
                <div className="lab-icon-blood-sugar" onClick={()=>{fbsRef.current.focus()}}>mg/dL</div>
              </div>
              <div>
                <label className="blood-sugar-label"><span>Blood Sugar</span> <span>After food (PPBS)</span></label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="ppbs"
                  onBlur={handleLabInputChange}
                  disabled={disableInput}
                  defaultValue={labState["ppbs"]}
                  ref={ppbsRef}

                />
                <div className="lab-icon-blood-sugar" onClick={()=>{ppbsRef.current.focus()}}>mg/dL</div>
              </div>
            </div>
          </div>
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
                  disabled={disableInput}
                  defaultValue={labState["crp"]}
                  ref={crpRef}
                />
                <div className="lab-icon" onClick={()=>{crpRef.current.focus()}}>mg/L</div>
              </div>
              <div>
                <label>ESR</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="esr"
                  onBlur={handleLabInputChange}
                  disabled={disableInput}
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
                  disabled={disableInput}
                  defaultValue={labState["dDimer"]}
                  ref={dDimerRef}

                />
                <div className="lab-icon" onClick={()=>{dDimerRef.current.focus()}}>ng/ml</div>
              </div>
              <div>
                <label>Ferritin</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="ferritin"
                  onBlur={handleLabInputChange}
                  disabled={disableInput}
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
                  disabled={disableInput}
                  defaultValue={labState["ldh"]}
                  ref={ldhRef}
                />
                <div className="lab-icon" onClick={()=>{ldhRef.current.focus()}}>U/L</div>
              </div>
              <div>
                <label>WBC</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="wbc"
                  onBlur={handleLabInputChange}
                  disabled={disableInput}
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
                  disabled={disableInput}
                  defaultValue={labState["neutrophil"]}
                  ref={neutrophilRef}
                />
                <div className="lab-icon" onClick={()=>{neutrophilRef.current.focus()}}>%</div>
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
                  disabled={disableInput}
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
                  disabled={disableInput}
                  defaultValue={labState["eosinophils"]}
                  ref={eosinophilsRef}
                />
                <div className="lab-icon" onClick={()=>{eosinophilsRef.current.focus()}}>%</div>
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
                  disabled={disableInput}
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
                  type="number"
                  min='0'
                  max='100'
                  inputMode="decimal"
                  name="platelets"
                  onBlur={handleLabInputChange}
                  disabled={disableInput}
                  defaultValue={labState["platelets"]}
                  ref={plateletsRef}
                />
                <div className="lab-icon" onClick={()=>{plateletsRef.current.focus()}}>%</div>
                {labError.platelets ? (
                  <p className="lab-error-message">{percentError}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>        
      </div>
    </>
  );
};

export default LabIntakeInput;
