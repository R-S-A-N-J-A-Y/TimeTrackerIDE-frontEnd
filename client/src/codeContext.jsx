import React, { createContext, useState } from 'react';

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState("#Code Here");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(" ");
  const [showTracker,setShowTracker] = useState(false);
  const [input1,setInput1] = useState("");
  const [input2,setInput2] = useState("");
  const [testCases, setTestCases] = useState([1]);

  return (
    <CodeContext.Provider value={{ code, setCode, language, setLanguage, result, setResult, showTracker, setShowTracker, input1, setInput1, input2, setInput2, testCases, setTestCases}}>
      {children}
    </CodeContext.Provider>
  );
};
