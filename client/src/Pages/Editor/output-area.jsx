import React, { useContext } from 'react';
import { CodeContext } from '../../codeContext.jsx';

function OutputArea() {
  const { result } = useContext(CodeContext);

  const outputText = result && (
    result.TrueorFalse === "true" 
      ? (result.answer && result.answer.join('\n')) 
      : (result.message && result.message.join('\n'))
  );

  return (
    <>
      <textarea name="Code" id="Output-Field" readOnly value={outputText || ''}></textarea>
      <h1 id="Output-Txt">Output</h1>
    </>
  );
}

export default OutputArea;