import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import useReactQuill from './ReactQuill.hook';
import { TOOLBAR_OPTIONS } from '../CustomQuillImplementation/quil_options';


function NPMQuill() {
  const { onQuillChange, onSaveDocument, quillRef } = useReactQuill();

  return (
    <div className='mt-10'>
      <ReactQuill
        theme='snow'
        onChange={onQuillChange}
        placeholder='Type something here'
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        ref={quillRef}
      />

      <div className='mt-3 flex items-center justify-between'>
        <button
          className="px-4 py-1 mt-3 bg-green-700 text-white"
          onClick={onSaveDocument}
        >
          Save document
        </button>

        <button
          className="px-4 py-1 mt-3 bg-blue-700 text-white"
          onClick={() => window.location.assign("/")}
        >
          New document
        </button>
      </div>
    </div>
  )
}

export default NPMQuill