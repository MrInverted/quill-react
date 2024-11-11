import React from 'react'
import ReactQuill from 'react-quill'
import Quill from 'quill';
import { useParams } from 'react-router-dom'
import { socket } from '../Socket/socket'

type IOnQuillChange = (
  value: string,
  delta: any,
  source: string,
  editor: ReactQuill.UnprivilegedEditor
) => void;

function useReactQuill() {
  const quillRef = React.useRef<ReactQuill>(null);
  const editor = React.useRef<Quill | null>(null);
  const { id } = useParams();

  React.useEffect(() => {
    if (!id) return;

    socket.emit("change-room", id);
  }, [id])

  React.useEffect(() => {
    if (!quillRef.current) return;
    if (editor.current) return;

    editor.current = quillRef.current.getEditor();
    editor.current.setText("Loading...");
    editor.current.disable();
  }, [quillRef]);

  React.useEffect(() => {
    if (!editor.current) return;

    const loadDocument = (loadedData: any) => {
      console.debug({ loadedData });
      editor.current!.setContents(loadedData);
      editor.current!.enable();
    }

    const updateContent = (updatedContent: any) => {
      console.debug({ updateContent })
      editor.current!.updateContents(updatedContent);
    }

    socket.once("load-document-from-server", loadDocument);
    socket.on("changes-from-server", updateContent);

    return () => {
      socket.off("changes-from-server", updateContent);
    }
  }, [editor]);

  const onQuillChange: IOnQuillChange = (value, delta, source) => {
    if (source !== "user") return;

    socket.emit("changes-from-client", delta);
  }

  const onSaveDocument = () => {
    if (!editor.current) return;

    socket.emit("save-document", id, editor.current.getContents());
  }



  return {
    onQuillChange, onSaveDocument, quillRef
  }
}

export default useReactQuill