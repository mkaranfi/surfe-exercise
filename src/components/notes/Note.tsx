import { useRef, useState, ChangeEvent, useEffect } from 'react';

import 'components/notes/Note.style.css';

import TextArea from 'components/ui-controls/text-area/TextArea';
import { ReactComponent as BinIcon } from 'assets/icons/bin.svg';

import useAutoHeightTextArea from 'hooks/useAutoHeightTextArea';

interface NoteProps {
  content: string;
  onBinIconClick: VoidFunction;
  onValueChangeCallback: Function;
}

const Note = (props: NoteProps) => {
  const { content = '', onBinIconClick, onValueChangeCallback } = props;

  const [value, setValue] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoHeightTextArea(textAreaRef.current, value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedValue = e.target?.value;

    setValue(updatedValue);
  };

  useEffect(() => {
    // this timer prevents calling the callback function on each key the user types
    const timer = setTimeout(() => {
      // the callback function in the parent component calls the API with a PUT request
      // we don't want to make the call on every typed key, instead we make the call every 300ms
      onValueChangeCallback(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onValueChangeCallback]);

  return (
    <div className="note-container" onClick={(event) => event.stopPropagation()}>
      <TextArea className="note-body" ref={textAreaRef} onChange={handleChange} value={value} />
      <BinIcon className="bin-icon" fill="#FF6666" onClick={onBinIconClick} />
    </div>
  );
};

export default Note;
