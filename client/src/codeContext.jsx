import React, { createContext, useState } from 'react';

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState("#Code Here");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(" ");

  return (
    <CodeContext.Provider value={{ code, setCode, language, setLanguage, result, setResult }}>
      {children}
    </CodeContext.Provider>
  );
};
