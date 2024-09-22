import React, { useContext } from "react";
import axios from "axios"; 

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";

import { CodeContext } from "../../codeContext.jsx";

const CodeEditor = () => {
  const { E2code, E2setCode, E2language, E2setLanguage, E2setResult, E2setShowTracker, E2input1, E2input2} = useContext(CodeContext);

  const RunCode = () => {
    axios 
      .post('http://localhost:8000/python/editor2', { code: E2code, input1: E2input1, input2: E2input2})
      .then(({data}) => {
        E2setResult(data);
        console.log(data);
      })
      .catch((data) => {
        alert("Error in connectivity with backend !!" );
        console.log(data);
      }
      ) 
  }

  const handleCodeChangeE2 = (value) => {
    if (value === "python") {
      E2setCode("#code Here");  
    } else {
      E2setCode("//code Here");
    }
  };

  const handleLanguageChangeE2 = (event) => {
    const selectedLanguage = event.target.value;
    E2setLanguage(selectedLanguage);
    handleCodeChangeE2(selectedLanguage);
  };

  const getModeE2 = (language) => {
    switch (language) {
      case "python":
        return "python";
      case "c":
      case "cpp":
        return "text/x-csrc";
      case "java":
        return "text/x-java";
      default:
        return "python";
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(12, 16, 33)" }} id="CodeEditor-div">
      
      <h1 id="Languages-Title">Languages</h1> 
      <select id="Languages" name="languages" onChange={handleLanguageChangeE2} value={E2language}>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="cpp">Cpp</option>
        <option value="java">Java</option>
      </select>

      <button id="Run" onClick={RunCode}>Run</button>

      <CodeMirror
        value={E2code}
        options={{
          mode: getModeE2(E2language),
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(_editor, _data, value) => {
          E2setCode(value);
        }}
        className="code-mirror"
      />
    </div>
  );
};

export default CodeEditor;
