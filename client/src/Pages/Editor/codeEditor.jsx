import React, { useContext } from "react";
import axios from "axios";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/htmlmixed/htmlmixed";
import "../../CSS File/Editor.css"; // Import your CSS file for additional styles
import { CodeContext } from "../../codeContext.jsx";

const CodeEditor = () => {
  const { code, setCode, language, setLanguage, setResult } = useContext(CodeContext);

  const RunCode = () => {
    axios 
      .post('http://localhost:3000/python', { code })
      .then(({data}) => setResult(data))
      .catch((error) => alert("Error in connectivity with backend !!" )) 
  }

  const handleCodeChange = (value) => {
    if (value === "python") {
      setCode("#code Here");
    } else {
      setCode("//code Here");
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    handleCodeChange(selectedLanguage);
  };

  const getMode = (language) => {
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
      <select id="Languages" name="languages" onChange={handleLanguageChange} value={language}>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="cpp">Cpp</option>
        <option value="java">Java</option>
      </select>

      <button id="Run" onClick={RunCode}>Run</button>

      <CodeMirror
        value={code}
        options={{
          mode: getMode(language),
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(_editor, _data, value) => {
          setCode(value);
        }}
        className="code-mirror"
      />
    </div>
  );
};

export default CodeEditor;
