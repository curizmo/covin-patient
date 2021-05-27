import React from "react";
import { DECIMAL_REGEX, DATE_FORMAT } from "../constants/constants";

import "../App.css";
import "./home.css";

const moment = require("moment");

const decimalPlaceError = "Round to one decimal place (e.g. 23.1)";

const LabIntakeInput = ({ labState, setLabState, labError, setLabError }) => {
  const handleLabInputChange = (e) => {
    const item = e.target.name;
    const value = e.target.value;

    setLabState({ ...labState, [item]: value });
    // @toDo add validation
    // setLabError((errors) => ({
    //   ...errors,
    //   [item]: !(value === "" || value?.match(DECIMAL_REGEX)?.[0]),
    // }));
    console.log('@toDo add validation', setLabError);
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
                  value={labState["crp"]}
                />
                {labError.crp ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
                ) : null}
                <div className="lab-icon-left-intake">mg/L</div>
              </div>
              <div>
                <label>ESR</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputMode="decimal"
                  name="esr"
                  onBlur={handleLabInputChange}
                  value={labState["esr"]}
                />
                <div className="lab-icon">mm/h</div>
                {labError.esr ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["dDimer"]}
                />
                <div className="lab-icon-left-intake">ng/ml</div>
                {labError.dDimer ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["ferritin"]}
                />
                <div className="lab-icon"> ng/ml</div>
                {labError.ferritin ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["ldh"]}
                />
                <div className="lab-icon-ldh">U/L</div>
                {labError.ldh ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["wbc"]}
                />
                <div className="lab-icon">/mm3</div>
                {labError.wbc ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["neutrophil"]}
                />
                <div className="lab-icon-left">%</div>
                {labError.neutrophil ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["lymphocytes"]}
                />
                <div className="lab-icon">%</div>
                {labError.lymphocytes ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["eosinophils"]}
                />
                <div className="lab-icon-left">%</div>
                {labError.eosinophils ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["basophils"]}
                />
                <div className="lab-icon">%</div>
                {labError.basophils ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
                  value={labState["platelets"]}
                />
                <div className="lab-icon-single">%</div>
                {labError.platelets ? (
                  <p className="lab-error-message">
                    {decimalPlaceError}
                  </p>
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
