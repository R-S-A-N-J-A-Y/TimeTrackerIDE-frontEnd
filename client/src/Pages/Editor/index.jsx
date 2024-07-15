import CodeEditor from "./codeEditor.jsx";
import InputArea from "./input-area.jsx";
import OutputArea from "./output-area.jsx";
import '../../CSS File/Editor.css'

const Editor = () => {
    return (
        <>
            <CodeEditor />
            <InputArea />
            <OutputArea />
        </>
    )
}

export default Editor;