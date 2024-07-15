import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/htmlmixed/htmlmixed";
import "../../CSS File/Editor.css"; // Import your CSS file for additional styles

function CodeEditor() {
  const [code, setCode] = useState("#Code Here");
  const [language, setLanguage] = useState("python");

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
    <>
      <div style={{ backgroundColor: "rgb(12, 16, 33)" }} id="CodeEditor-div">

        <h1 id="Languages-Title">Languages</h1>
        <select id="Languages" name="languages" onChange={handleLanguageChange} value={language}>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">Cpp</option>
          <option value="java">Java</option>
        </select>

        <button id="Run">Run</button>

        <CodeMirror
          value={code}
          options={{
            mode: getMode(language),
            theme: "material",
            lineNumbers: true,
          }}
          onBeforeChange = { (editor, data, value) => {
            setCode(value);
          }}
          className="code-mirror"
        />
      </div>
    </>
  );
}

export default CodeEditor;
