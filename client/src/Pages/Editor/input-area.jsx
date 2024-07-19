import { React, useContext } from "react";
import { CodeContext } from "../../codeContext";

function InputArea(){
    const {input, setInput} = useContext(CodeContext);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    return (
        <>            
            <textarea 
                name="Code" 
                id="Input-Field"
                value={input}
                onChange={handleInputChange}
            ></textarea>
            <h1 id="Input-Txt">Input </h1>
        </>
    )
}

export default InputArea;