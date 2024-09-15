import React, { createContext, useState } from 'react';

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {

  //for Editor
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

  //Tracker
  const [showTracker,setShowTracker] = useState(false);

  return (
    <CodeContext.Provider value={{ code, setCode, language, setLanguage, result, setResult, showTracker, setShowTracker, input1, setInput1, input2, setInput2, testCases, setTestCases, btnColor1, setBtnColor1, btnColor2, setBtnColor2, txtArea1,setTxtArea1, txtArea2, setTxtArea2}}>
      {children}
    </CodeContext.Provider>
  );
};
