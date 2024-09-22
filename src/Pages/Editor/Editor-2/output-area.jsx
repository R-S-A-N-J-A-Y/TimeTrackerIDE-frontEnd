import React, { useContext } from 'react';
import { CodeContext } from '../../codeContext.jsx';
import { TxtField } from '../Custom Hook/useTxtField.jsx';

function OutputArea() {
  const { 
    E2result, 
    E2testCases,
    E2txtArea1, E2setTxtArea1, 
    E2txtArea2, E2setTxtArea2,
    E2btnColor1, E2setBtnColor1,
    E2btnColor2, E2setBtnColor2
  } = useContext(CodeContext);

  // Check if result.message is a string or an array
  const outputText1 = E2result.result1 && (
    E2result.result1.TrueorFalse === "true"
      ? (E2result.result1.answer && E2result.result1.answer.join('\n'))
      : (typeof E2result.result1.message === 'string' ? E2result.result1.message : E2result.result1.message?.join('\n') || '')
  );

  const outputText2 = E2result.result2 && (
    E2result.result2.TrueorFalse === "true"
      ? (E2result.result2.answer && E2result.result2.answer.join('\n'))
      : (typeof E2result.result1.message === 'string' ? E2result.result2.message : E2result.result2.message?.join('\n') || '')
  );

  return (
    <>
      <div id="Output-Field-Div">
        <h1 id="Output-Txt">Output :</h1>
        <div id="TestCases">
          {E2testCases.map((testCase) => (
              <button 
                key={testCase} 
                style={{backgroundColor: testCase===1 ? E2btnColor1 : E2btnColor2 }}
                className={`TestCase-${testCase}`} 
                onClick={() => TxtField(testCase, E2setTxtArea1, E2setTxtArea2, E2setBtnColor1, E2setBtnColor2)}>
              <p>{testCase}</p>
              </button>
          ))}
        </div>

        {E2txtArea1 && <textarea 
          name="Code" 
          id="Output-Field" readOnly 
          value={outputText1 || ''}
        > </textarea>}

        {E2txtArea2 && <textarea 
          name="Code" 
          id="Output-Field" readOnly 
          value={outputText2 ||''}
        > </textarea>}
        
        {E2txtArea1 && E2result.result1 &&<p id='Output-Time-Txt'> Execution Time: {E2result.result1.ExecutionTime}</p>}

        {E2txtArea2 && E2result.result2 &&<p id='Output-Time-Txt'> Execution Time: {E2result.result2.ExecutionTime}</p>}
      </div>
    </>
  );
}

export default OutputArea;