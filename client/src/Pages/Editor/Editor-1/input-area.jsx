import { React, useContext, useState } from "react";
import { CodeContext } from "../../codeContext.jsx";
import { TxtField } from "../Custom Hook/useTxtField.jsx";

function InputArea(){
    const {
        input1, setInput1, 
        input2, setInput2, 
        testCases, setTestCases, 
        btnColor1, setBtnColor1, 
        btnColor2, setBtnColor2,
        txtArea1,setTxtArea1, 
        txtArea2,setTxtArea2
    } = useContext(CodeContext);

    const [ showBtn,setShowBtn ] = useState(true);

    const handleInputChange1 = (event) => {
        setInput1(event.target.value);
    }

    const handleInputChange2 = (event) => {
        setInput2(event.target.value);
    }

    const addTestCase = () => {
        setTxtArea1(false);
        setTxtArea2(true);
        setShowBtn(false);
        setTestCases([...testCases, testCases.length + 1]);
        setBtnColor1("white");
    };

    return (
        <>  
            <div id="Input-Field-Div">

                <h1 id="Input-Txt">Input : </h1>
                
                <div id="TestCases">
                    {testCases.map((testCase) => (
                        <button 
                            style={{ backgroundColor: testCase===1 ? btnColor1 : btnColor2 }} 
                            key={testCase} 
                            className={`TestCase-${testCase}`} 
                            onClick={() => TxtField(testCase, setTxtArea1, setTxtArea2, setBtnColor1, setBtnColor2)}
                        > <p>{testCase}</p> </button>
                    ))}
                    {showBtn && <button className="TestCase-1" onClick={addTestCase}><p>+</p></button>}
                </div>
                
                {txtArea1 && <textarea 
                    name="Code" 
                    id="Input-Field"
                    value={input1}
                    onChange={handleInputChange1}
                ></textarea>}

                {txtArea2 && <textarea 
                    name="Code" 
                    id="Input-Field"
                    value={input2}
                    onChange={handleInputChange2}
                ></textarea>}
            </div>  
        </>
    )
}

export default InputArea;