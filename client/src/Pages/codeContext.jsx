import React, { createContext, useState } from 'react';

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {

  //for Editor 1
  const [code, setCode] = useState("#Code Here");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(" ");
  const [input1,setInput1] = useState("");
  const [input2,setInput2] = useState("");
  const [testCases, setTestCases] = useState([1]);
  const [btnColor1, setBtnColor1] = useState("blue");
  const [btnColor2, setBtnColor2] = useState("blue");
  const [txtArea1, setTxtArea1] = useState(true);
  const [txtArea2, setTxtArea2] = useState(false);

  //for Editor 2
  const [E2code, E2setCode] = useState("#Code Here");
  const [E2language, E2setLanguage] = useState("python");
  const [E2result, E2setResult] = useState(" ");
  const [E2input1, E2setInput1] = useState("");
  const [E2input2,E2setInput2] = useState("");
  const [E2testCases, E2setTestCases] = useState([1]);
  const [E2btnColor1, E2setBtnColor1] = useState("blue");
  const [E2btnColor2, E2setBtnColor2] = useState("blue");
  const [E2txtArea1, E2setTxtArea1] = useState(true);
  const [E2txtArea2, E2setTxtArea2] = useState(false);

  //Tracker
  const [showTracker,setShowTracker] = useState(false);
  const [E2showTracker, E2setShowTracker] = useState(false);

  return (
    <CodeContext.Provider value={{ 
      code, setCode, language, setLanguage, result, setResult, 
      input1, setInput1, input2, setInput2, 
      testCases, setTestCases, 
      btnColor1, setBtnColor1, btnColor2, setBtnColor2, txtArea1,setTxtArea1, txtArea2, setTxtArea2,

      E2code, E2setCode, E2language, E2setLanguage, E2result, E2setResult, 
      E2input1, E2setInput1, E2input2, E2setInput2, 
      E2testCases, E2setTestCases, 
      E2btnColor1, E2setBtnColor1, E2btnColor2, E2setBtnColor2, E2txtArea1,E2setTxtArea1, E2txtArea2, E2setTxtArea2,

      showTracker, setShowTracker,
      E2showTracker, E2setShowTracker     
    }}>
      {children}
    </CodeContext.Provider>
  );
};
