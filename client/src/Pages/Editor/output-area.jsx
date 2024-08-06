import React, { useContext, useState } from 'react';
import { CodeContext } from '../../codeContext.jsx';

function OutputArea() {
  const { result, testCases, setTestCases } = useContext(CodeContext);

  const [txtArea1,setTxtArea1] = useState(true);
  const [txtArea2,setTxtArea2] = useState(false);

  // Check if result.message is a string or an array
  const outputText1 = result.result1 && (
    result.result1.TrueorFalse === "true"
      ? (result.result1.answer && result.result1.answer.join('\n'))
      : (typeof result.result1.message === 'string' ? result.result1.message : result.result1.message?.join('\n') || '')
  );

  const outputText2 = result.result2 && (
    result.result2.TrueorFalse === "true"
      ? (result.result2.answer && result.result2.answer.join('\n'))
      : (typeof result.result1.message === 'string' ? result.result2.message : result.result2.message?.join('\n') || '')
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
          value={outputText1 || ''}
        > </textarea>}

        {txtArea2 && <textarea 
          name="Code" 
          id="Output-Field" readOnly 
          value={outputText2 ||''}
        > </textarea>}
        
        {txtArea1 && result.result1 &&<p id='Output-Time-Txt'> Execution Time: {result.result1.ExecutionTime}</p>}

        {txtArea2 && result.result2 &&<p id='Output-Time-Txt'> Execution Time: {result.result2.ExecutionTime}</p>}
      </div>
    </>
  );
}

export default OutputArea;