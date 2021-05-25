import React from "react";

import "../App.css";
import "./home.css";

const LabIntakeInput = () => {
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
                  min="0"
                  max="300"
                  name="crp"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>ESR</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  min="0"
                  max="300"
                  name="esr"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpLowerRange)}
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
                  min="0"
                  max="300"
                  name="dDimer"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>Ferritin</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  min="0"
                  max="300"
                  name="ferritin"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpLowerRange)}
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
                  min="0"
                  max="300"
                  name="idh"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>WBC</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  min="0"
                  max="300"
                  name="wbc"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpLowerRange)}
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
                  min="0"
                  max="300"
                  name="neutrophil"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>% Lymphocytes</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  min="0"
                  max="300"
                  name="lymphocytes"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpLowerRange)}
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
                  min="0"
                  max="300"
                  name="eosinophils"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
                />
                {/* <div className="icon">beats/min</div> */}
              </div>
              <div>
                <label>Basophils</label>
                <input
                  className="bp bp-lower"
                  type="text"
                  inputmode="decimal"
                  min="0"
                  max="300"
                  name="basophils"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpLowerRange)}
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
                  min="0"
                  max="300"
                  name="platelets"
                  //   onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
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
