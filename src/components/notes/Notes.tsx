import { useState } from 'react';
import { map } from 'lodash';

import 'components/notes/Notes.style.scss';

import Note from 'components/notes/Note';
import MostMentionedUsers from 'components/mention/MostMentionedUsers';

import { useNotes } from 'hooks/useNotes';

const Notes = () => {
  const [deletedNoteId, setDeletedNoteId] = useState<string>('');

  const { notes, createNote, deleteNote, updateNote } = useNotes();

  const handleOnClick = () => createNote();

  const handleOnValueChange = (noteId: string) => (value: string) => updateNote(noteId, value);

  const handleOnBinIconClick = (noteId: string) => () => {
    setDeletedNoteId(noteId);
    setTimeout(() => {
      deleteNote(noteId);
      // add delay to play pop out animation
    }, 300);
  };

  const mappedNotes = map(notes, ({ id, body }) => (
    <Note
      className={deletedNoteId === id ? 'remove-note' : ''}
      key={`note-id-${id}`}
      onBinIconClick={handleOnBinIconClick(id)}
      onValueChangeCallback={handleOnValueChange(id)}
      content={body}
    />
  ));

  return (
    <div className="notes-container" onClick={handleOnClick}>
      <div className="notes-title-container">
        <span className="notes-title">Click anywhere to add your note! 😃</span>
        <div className="most-mentioned">
          <MostMentionedUsers />
        </div>
      </div>
      <div className="mapped-notes-container">{mappedNotes}</div>
    </div>
  );
};

export default Notes;
