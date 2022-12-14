import { useRef, useState, ChangeEvent } from 'react';

import 'components/notes/Note.style.css';

import TextArea from 'components/ui-controls/text-area/TextArea';
import Input from 'components/ui-controls/input/Input';
import { ReactComponent as BinIcon } from 'assets/icons/bin.svg';

import useAutoHeightTextArea from 'hooks/useAutoHeightTextArea';

interface NoteProps {
  onBinClick: VoidFunction;
}

const Note = (props: NoteProps) => {
  const { onBinClick } = props;

  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoHeightTextArea(textAreaRef.current, value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target?.value;

    setValue(val);
  };

  return (
    <div className="note-container" onClick={(event) => event.stopPropagation()}>
      <Input className="note-header" />
      <TextArea className="note-body" ref={textAreaRef} onChange={handleChange} value={value} />
      <BinIcon className="bin-icon" fill="#FF6666" onClick={onBinClick} />
    </div>
  );
};

export default Note;
