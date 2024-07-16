// index.jsx
import React from 'react';
import { CodeProvider } from '../../codeContext.jsx';
import CodeEditor from './codeEditor.jsx';
import InputArea from './input-area.jsx';
import OutputArea from './output-area.jsx';

const Editor = () => {
    return (
        <CodeProvider>
            <>
                <CodeEditor />
                <InputArea />
                <OutputArea />
            </>
        </CodeProvider>
    )
}

export default Editor;
