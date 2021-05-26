import React from "react";
import { DECIMAL_REGEX } from "../constants/constants";

import "../App.css";
import "./home.css";

const LabIntakeInput = ({
  labState,
  setLabState,
  crpError,
  setCrpError,
  esrError,
  setEsrError,
  dDimerError,
  setDdimerError,
  ferritinError,
  setFerritinError,
  ldhError,
  setLdhError,
  wbcError,
  setWbcError,
  neutrophilError,
  setNeutrophilError,
  lymphocytesError,
  setLymphocytesError,
  eosinophilsError,
  setEosinophilsError,
  basophilsError,
  setBasophilsError,
  plateletsError,
  setPlateletsError,
}) => {
  const handleCrpChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setCrpError(false);
    } else {
      setCrpError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleEsrChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setEsrError(false);
    } else {
      setEsrError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleDdimerChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setDdimerError(false);
    } else {
      setDdimerError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleFerritinChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setFerritinError(false);
    } else {
      setFerritinError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleLdhChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setLdhError(false);
    } else {
      setLdhError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleWbcChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setWbcError(false);
    } else {
      setWbcError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleNeutrophilChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setNeutrophilError(false);
    } else {
      setNeutrophilError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleLymphocytesChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setLymphocytesError(false);
    } else {
      setLymphocytesError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleEosinophilsChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setEosinophilsError(false);
    } else {
      setEosinophilsError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handleBasophilsChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setBasophilsError(false);
    } else {
      setBasophilsError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
  };

  const handlePlateletsChange = (e) => {
    const item = e.target.name;
    if (e.target.value === "" || e.target.value.match(DECIMAL_REGEX)) {
      setPlateletsError(false);
    } else {
      setPlateletsError(true);
    }
    setLabState({ ...labState, [item]: e.target.value });
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
                  onChange={handleCrpChange}
                  value={labState["crp"]}
                />
                {crpError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleEsrChange}
                  value={labState["esr"]}
                />
                <div className="lab-icon">mm/h</div>
                {esrError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleDdimerChange}
                  value={labState["dDimer"]}
                />
                <div className="lab-icon-left-intake">ng/ml</div>
                {dDimerError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleFerritinChange}
                  value={labState["ferritin"]}
                />
                <div className="lab-icon"> ng/ml</div>
                {ferritinError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleLdhChange}
                  value={labState["ldh"]}
                />
                <div className="lab-icon-ldh">U/L</div>
                {ldhError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleWbcChange}
                  value={labState["wbc"]}
                />
                <div className="lab-icon">/mm3</div>
                {wbcError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleNeutrophilChange}
                  value={labState["neutrophil"]}
                />
                <div className="lab-icon-left">%</div>
                {neutrophilError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleLymphocytesChange}
                  value={labState["lymphocytes"]}
                />
                <div className="lab-icon">%</div>
                {lymphocytesError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleEosinophilsChange}
                  value={labState["eosinophils"]}
                />
                <div className="lab-icon-left">%</div>
                {eosinophilsError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handleBasophilsChange}
                  value={labState["basophils"]}
                />
                <div className="lab-icon">%</div>
                {basophilsError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
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
                  onChange={handlePlateletsChange}
                  value={labState["platelets"]}
                />
                <div className="lab-icon-single">%</div>
                {plateletsError ? (
                  <p className="lab-error-message">
                    upto one decimal point only
                  </p>
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
