import React from 'react';
import { CodeProvider } from '../codeContext.jsx';

import CodeEditor from './Editor/codeEditor.jsx';
import InputArea from './Editor/input-area.jsx';
import OutputArea from './Editor/output-area.jsx';
import Notations from './Tracker/Notaions.jsx';

const Editor = () => {
    return (
        <CodeProvider>
            <div id="Editor-div">
                <CodeEditor />
                <InputArea />
                <OutputArea />
            </div>
            <div>
                <Notations />        
            </div>
        </CodeProvider>
    )
}

export default Editor;
