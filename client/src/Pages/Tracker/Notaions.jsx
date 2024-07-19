import React, { useContext } from "react";
import { CodeContext } from "../../codeContext";

function Notations(){
    const {showTracker} = useContext(CodeContext);

    const display = showTracker && (
        <>
            <h1>Tracker</h1>
        </>
    )
    return (
        <div>
            {display}
        </div>
    )
}

export default Notations;