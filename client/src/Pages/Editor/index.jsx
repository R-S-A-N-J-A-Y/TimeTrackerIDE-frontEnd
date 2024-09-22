// src/Pages/Editor/index.jsx
import React from 'react';
import CodeEditor from './Editor-1/codeEditor.jsx';  // Adjust the path if needed
import InputArea from './Editor-1/input-area.jsx';
import OutputArea from './Editor-1/output-area.jsx';


import CodeEditorE2 from './Editor-2/codeEditor.jsx';
import InputAreaE2 from './Editor-2/input-area.jsx';
import OutputAreaE2 from './Editor-2/output-area.jsx';

const EditorIndex = () => {
  return (
    <div id='Editor'>
        <div id='Editor-Item-1'>
            <CodeEditor />
            <InputArea />
            <OutputArea />
        </div>
    
        <div id='Editor-Item-2'>    
            <CodeEditorE2 />
            <InputAreaE2 />
            <OutputAreaE2 />
        </div>
    </div>
  );
};

export default EditorIndex;
