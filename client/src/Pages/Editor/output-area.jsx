import React, { useContext, useState } from 'react';
import { CodeContext } from '../../codeContext.jsx';

function OutputArea() {
  const { result, testCases, setTestCases } = useContext(CodeContext);

  const [txtArea1,setTxtArea1] = useState(true);
  const [txtArea2,setTxtArea2] = useState(false);

  // Check if result.message is a string or an array
  const outputText = result && (
    result.TrueorFalse === "true"
      ? (result.answer && result.answer.join('\n'))
      : (typeof result.message === 'string' ? result.message : result.message?.join('\n') || '')
  );

  const TxtField = (idx) =>{
    if (idx==1){
        setTxtArea1(true);
        setTxtArea2(false);
    }
    else{
        setTxtArea1(false);
        setTxtArea2(true);
    }
  }

  return (
    <>
      <div id="Output-Field-Div">
        <h1 id="Output-Txt">Output :</h1>
        <div id="TestCases">
          {testCases.map((testCase) => (
              <button key={testCase} id="TestCase" onClick={() => TxtField(testCase)}>
              <p>{testCase}</p>
              </button>
          ))}
        </div>

        {txtArea1 && <textarea 
          name="Code" 
          id="Output-Field" readOnly 
          value={outputText || ''}
        > </textarea>}

        {txtArea2 && <textarea 
          name="Code" 
          id="Output-Field" readOnly 
          value={''}
        > </textarea>}
        
        {result &&<p id='Output-Time-Txt'> Execution Time: {result.ExecutionTime}</p>}
      </div>
    </>
  );
}

export default OutputArea;