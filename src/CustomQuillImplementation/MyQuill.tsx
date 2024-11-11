import React from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"

import { TOOLBAR_OPTIONS } from './quil_options';

function MyQuill() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const quill = React.useRef<Quill | null>();
  const [length, setLength] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);

  React.useEffect(() => {
    if (!containerRef.current) return;
    if (quill.current) return;

    quill.current = new Quill(containerRef.current, {
      theme: "snow",
      placeholder: "Type something here",
      modules: {
        toolbar: TOOLBAR_OPTIONS
      }
    })
  }, [containerRef]);

  React.useEffect(() => {
    const onQuillChange = () => {
      const length = quill.current?.getLength();
      setLength(length ?? 0);
    }

    quill.current?.on("text-change", onQuillChange);

    return () => {
      quill.current?.off("text-change", onQuillChange)
    }
  }, [quill])

  const onGetInfoClick = () => {
    const text = quill.current?.getText();
    const html = quill.current?.getSemanticHTML();
    const contents = quill.current?.getContents();

    console.log({ text, html, contents });
  }

  const onToggleClick = () => {
    const isActive = quill.current?.isEnabled();

    if (isActive) {
      quill.current?.enable(false);
      setIsActive(false);
    } else {
      quill.current?.enable(true);
      setIsActive(true);
    }
  }

  const onLogEditor = () => {
    console.dir(quill.current)
  }

  return (
    <>
      <div ref={containerRef}></div>
      <div className='flex items-center mt-2 gap-3'>
        <button onClick={onGetInfoClick} className='border px-3 py-1 bg-gray-100'>Get info</button>
        <button onClick={onLogEditor} className='border px-3 py-1 bg-gray-100'>Log editor</button>
        <button onClick={onToggleClick} className='border px-3 py-1 bg-gray-100'>{isActive ? "Disable" : "Activate"}</button>
        <span className='ml-auto'>Length: {length}</span>
      </div>
    </>
  )
}

export default MyQuill