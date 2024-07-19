import React from 'react';
import ReactDOM from 'react-dom/client';
import Editor from './Pages/index.jsx';

import './CSS File/general.css'
import './CSS File/Editor.css'
import './CSS File/Notations.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Editor />
    </>
);