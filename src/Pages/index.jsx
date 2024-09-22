import {React, useContext} from 'react';
import { CodeProvider, CodeContext } from './codeContext.jsx';

import EditorIndex from './Editor/index.jsx'
import Notations from './Tracker/Notaions.jsx';

const Editor = () => {
    return (
        <CodeProvider>
            <EditorContent />
        </CodeProvider>
    )
}

const EditorContent = () => {
    const { showTracker, result, E2showTracker, E2result } = useContext(CodeContext); // Now inside CodeProvider
    return (
        <>
            <div id="Editor-div">
                <EditorIndex />
            </div>

            {showTracker && <div id="LineChart">
                <Notations showTracker = {showTracker} result = {result} ID = "Editor-1" /> 
                {E2showTracker && <Notations showTracker = {E2showTracker} result = {E2result} ID = "Editor-2" />   }      
            </div>}
        </>
    );
}

export default Editor;
