import React from "react";

import "../App.css";
import "./home.css";

const LabIntakeInput = ({ labState, setLabState }) => {
  const handleInputChange = (e) => {
    const item = e.target.name;
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
                  inputmode="decimal"
                  name="crp"
                  onChange={handleInputChange}
                />
                <div className="lab-icon-left-intake">mg/L</div>
              </div>
              <div>
                <label>ESR</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputmode="decimal"
                  name="esr"
                  onChange={handleInputChange}
                />
                <div className="lab-icon">mm/h</div>
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
                  inputmode="decimal"
                  name="dDimer"
                  onChange={handleInputChange}
                />
                <div className="lab-icon-left-intake">ng/ml</div>
              </div>
              <div>
                <label>Ferritin</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputmode="decimal"
                  name="ferritin"
                  onChange={handleInputChange}
                />
                <div className="lab-icon"> ng/ml</div>
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
                  inputmode="decimal"
                  name="ldh"
                  onChange={handleInputChange}
                />
                <div className="lab-icon-ldh">U/L</div>
              </div>
              <div>
                <label>WBC</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputmode="decimal"
                  name="wbc"
                  onChange={handleInputChange}
                />
                <div className="lab-icon">/mm3</div>
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
                  inputmode="decimal"
                  name="neutrophil"
                  onChange={handleInputChange}
                />
                <div className="lab-icon-left">%</div>
              </div>
              <div>
                <label>Lymphocytes</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputmode="decimal"
                  name="lymphocytes"
                  onChange={handleInputChange}
                />
                <div className="lab-icon">%</div>
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
                  inputmode="decimal"
                  name="eosinophils"
                  onChange={handleInputChange}
                />
                <div className="lab-icon-left">%</div>
              </div>
              <div>
                <label>Basophils</label>
                <input
                  className="bp bp-lower"
                  type="number"
                  inputmode="decimal"
                  name="basophils"
                  onChange={handleInputChange}
                />
                <div className="lab-icon">%</div>
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
                  inputmode="decimal"
                  name="platelets"
                  onChange={handleInputChange}
                />
                <div className="lab-icon-single">%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabIntakeInput;
