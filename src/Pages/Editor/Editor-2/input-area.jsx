import { React, useContext, useState } from "react";
import { CodeContext } from "../../codeContext.jsx";
import { TxtField } from "../Custom Hook/useTxtField.jsx";

function InputArea(){
    const {
        E2input1, E2setInput1, 
        E2input2, E2setInput2, 
        E2testCases, E2setTestCases, 
        E2btnColor1, E2setBtnColor1, 
        E2btnColor2, E2setBtnColor2,
        E2txtArea1, E2setTxtArea1, 
        E2txtArea2, E2setTxtArea2
    } = useContext(CodeContext);

    const [ E2showBtn, E2setShowBtn ] = useState(true);

    const handleInputChange1 = (event) => {
        E2setInput1(event.target.value);
    }

    const handleInputChange2 = (event) => {
        E2setInput2(event.target.value);
    }

    const addTestCase = () => {
        E2setTxtArea1(false);
        E2setTxtArea2(true);
        E2setShowBtn(false);
        E2setTestCases([...E2testCases, E2testCases.length + 1]);
        E2setBtnColor1("white");
    };

    return (
        <>  
            <div id="Input-Field-Div">

                <h1 id="Input-Txt">Input : </h1>
                
                <div id="TestCases">
                    {E2testCases.map((testCase) => (
                        <button 
                            style={{ backgroundColor: testCase===1 ? E2btnColor1 : E2btnColor2 }} 
                            key={testCase} 
                            className={`TestCase-${testCase}`} 
                            onClick={() => TxtField(testCase, E2setTxtArea1, E2setTxtArea2, E2setBtnColor1, E2setBtnColor2)}
                        > <p>{testCase}</p> </button>
                    ))}
                    {E2showBtn && <button className="TestCase-1" onClick={addTestCase}><p>+</p></button>}
                </div>
                
                {E2txtArea1 && <textarea 
                    name="Code" 
                    id="Input-Field"
                    value={E2input1}
                    onChange={handleInputChange1}
                ></textarea>}

                {E2txtArea2 && <textarea 
                    name="Code" 
                    id="Input-Field"
                    value={E2input2}
                    onChange={handleInputChange2}
                ></textarea>}
            </div>  
        </>
    )
}

export default InputArea;