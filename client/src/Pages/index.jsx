import {React, useContext} from 'react';
import { CodeProvider, CodeContext } from '../codeContext.jsx';

import CodeEditor from './Editor/codeEditor.jsx';
import InputArea from './Editor/input-area.jsx';
import OutputArea from './Editor/output-area.jsx';
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
                <CodeEditor />
                <InputArea />
                <OutputArea />
            </div>
            {showTracker && <div id="LineChart">
                <Notations />        
            </div>}
        </>
    );
}

export default Editor;
