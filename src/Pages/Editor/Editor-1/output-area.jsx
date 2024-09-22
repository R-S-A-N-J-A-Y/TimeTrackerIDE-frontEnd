import React, { useContext } from 'react';
import { CodeContext } from '../../codeContext.jsx';
import { TxtField } from '../Custom Hook/useTxtField.jsx';

function OutputArea() {
  const { 
    result, 
    testCases,
    txtArea1, setTxtArea1, 
    txtArea2, setTxtArea2,
    btnColor1, setBtnColor1,
    btnColor2, setBtnColor2
  } = useContext(CodeContext);

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

  return (
    <>
      <div id="Output-Field-Div">
        <h1 id="Output-Txt">Output :</h1>
        <div id="TestCases">
          {testCases.map((testCase) => (
              <button 
                key={testCase} 
                style={{backgroundColor: testCase===1 ? btnColor1 : btnColor2 }}
                className={`TestCase-${testCase}`} 
                onClick={() => TxtField(testCase, setTxtArea1, setTxtArea2, setBtnColor1, setBtnColor2)}>
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
        
        {txtArea1 && result.result1 &&<p id='Output-Time-Txt'> Execution Time: {result.result1.ExecutionTime.toFixed(3)}</p>}

        {txtArea2 && result.result2 &&<p id='Output-Time-Txt'> Execution Time: {result.result2.ExecutionTime.toFixed(3)}</p>}
      </div>
    </>
  );
}

export default OutputArea;