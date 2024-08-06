import { React, useContext, useState } from "react";
import { CodeContext } from "../../codeContext";

function InputArea(){
    const {input1, setInput1, input2, setInput2, testCases, setTestCases, btnColor, setBtnColor} = useContext(CodeContext);

    const [txtArea1,setTxtArea1] = useState(true);
    const [txtArea2,setTxtArea2] = useState(false);
    const [showBtn,setShowBtn] = useState(true);

    const handleInputChange1 = (event) => {
        setInput1(event.target.value);
    }

    const handleInputChange2 = (event) => {
        setInput2(event.target.value);
    }
    
    const TxtField = (idx) =>{
        if (idx==1){
            setTxtArea1(true);
            setTxtArea2(false);
            setBtnColor("blue");
        }
        else{
            setBtnColor("white");
            setTxtArea1(false);
            setTxtArea2(true);
        }
    }

    const addTestCase = () => {
        setShowBtn(false)
        setTestCases([...testCases, testCases.length + 1]);
    };

    return (
        <>  
            <div id="Input-Field-Div">

                <h1 id="Input-Txt">Input : </h1>
                
                <div id="TestCases">
                    {testCases.map((testCase) => (
                        <button style={{ backgroundColor: btnColor }} key={testCase} id="TestCase" onClick={() => TxtField(testCase)}>
                        <p>{testCase}</p>
                        </button>
                    ))}
                    {showBtn && <button id="TestCase" onClick={addTestCase}><p>+</p></button>}
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