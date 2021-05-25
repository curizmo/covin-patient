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
                  type="text"
                  inputmode="decimal"
                  name="crp"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>ESR</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  name="esr"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>D-dimer</label>
                <input
                  className="bp"
                  type="text"
                  inputmode="decimal"
                  name="dDimer"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>Ferritin</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  name="ferritin"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>IDH</label>
                <input
                  className="bp"
                  type="text"
                  inputmode="decimal"
                  name="idh"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>WBC</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  name="wbc"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>% Neutrophil</label>
                <input
                  className="bp"
                  type="text"
                  inputmode="decimal"
                  name="neutrophil"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>% Lymphocytes</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  name="lymphocytes"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>Eosinophils</label>
                <input
                  className="bp"
                  type="text"
                  inputmode="decimal"
                  name="eosinophils"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>Basophils</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  name="basophils"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
            </div>
          </div>
          <div className="lab-input-wrap">
            <div className="lab-vitals">
              <div>
                <label>Platelets</label>
                <input
                  className="bp"
                  type="text"
                  inputmode="decimal"
                  name="platelets"
                  onChange={handleInputChange}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabIntakeInput;
