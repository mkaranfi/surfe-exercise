import { ChangeEvent, DragEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash';

import 'components/notes/Note.style.css';
import { ReactComponent as BinIcon } from 'assets/icons/bin.svg';

import TextArea from 'components/ui-controls/text-area/TextArea';
import MentionedUsers from 'components/mention/MentionedUsers';

import { useAutoHeightTextArea } from 'hooks/useAutoHeightTextArea';
import { useMention } from 'hooks/useMention';

import { User } from 'types/User';

interface NoteProps {
  content: string;
  className: string;
  onBinIconClick: VoidFunction;
  onValueChangeCallback: Function;
}

const Note = (props: NoteProps) => {
  const { content = '', className, onBinIconClick, onValueChangeCallback } = props;

  const [value, setValue] = useState(content);
  const [searchedValue, setSearchedValue] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutoHeightTextArea(textAreaRef.current, value);

  const { toggleMention, isMentionStarted, insertMention } = useMention();

  useEffect(() => {
    // this timer prevents calling the callback function on each key the user types
    const timer = setTimeout(() => {
      // the callback function in the parent component calls the API with a PUT request
      // we don't want to make the call on every typed key, instead we make the call after 500ms
      onValueChangeCallback(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onValueChangeCallback]);

  const handleNoteValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedValue = event.target?.value;
    setValue(updatedValue);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === '@') {
      if (!isMentionStarted) {
        toggleMention();
      }
      setSearchedValue('');
      return;
    }
    if (isMentionStarted) {
      const newValue = `${searchedValue}${event.key}`.toLowerCase();
      setSearchedValue(newValue);
    } else {
      setSearchedValue('');
    }
  };

  const handleOnMentionClick = (user: User) => () => {
    const noteWithMention = insertMention(value, user);
    setValue(noteWithMention);
    setSearchedValue('');
    toggleMention();
  };

  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedMention = event.dataTransfer.getData('mention');
    const newValue = `${value} ${droppedMention}`;
    setValue(newValue);
  };

  // assigns animation class to the note
  const noteClass = isEmpty(className) ? 'add-note' : className;

  return (
    <div
      className={`note-container ${noteClass}`}
      onDropCapture={handleDragEvent}
      onDragOver={(event) => event.preventDefault()}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={'note-row-container'}>
        <TextArea
          className="note-body"
          ref={textAreaRef}
          onKeyDown={handleOnKeyDown}
          onChange={handleNoteValueChange}
          value={value}
        />
        {isMentionStarted && (
          <MentionedUsers filterKeyword={searchedValue} onClickCallback={handleOnMentionClick} />
        )}
      </div>
      <BinIcon className="bin-icon" fill="#FF6666" onClick={onBinIconClick} />
    </div>
  );
};

export default Note;
