import "./App.css";
import React, { useState } from "react";
import PatientVitals from "./pages/PatientVitals";
import TermsAndCondition from "./pages/TermsAndCondition";

function App() {
  const [isAgreed, setIsAgreed] = useState(false);
  return (
    <div className="App">
      {!isAgreed && <TermsAndCondition setIsAgreed={setIsAgreed} />}
      {isAgreed && <PatientVitals />}
    </div>
  );
}

export default App;
