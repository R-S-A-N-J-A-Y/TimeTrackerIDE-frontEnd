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
    const { showTracker } = useContext(CodeContext); // Now inside CodeProvider
    return (
        <>
            <div id="Editor-div">
                <EditorIndex />
            </div>

            {showTracker && <div id="LineChart">
                <Notations />        
            </div>}
        </>
    );
}

export default Editor;
