import React from 'react';
import ReactDOM from 'react-dom/client';
import Editor from './Pages/Editor/index.jsx';
import showGraph1 from './Pages/Time-Tracker/showGraph.jsx';

import './CSS File/general.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Editor />
        <showGraph />
    </>
);