import { useEffect, useState } from 'react';
import { filter, map } from 'lodash';

import 'components/notes/Notes.style.scss';

import Note from 'components/notes/Note';
import MostMentionedUsers from 'components/mention/MostMentionedUsers';

import { useSession } from 'hooks/useSession';
import { useNotes } from 'hooks/useNotes';

import { postNote } from 'api/notes-api-client';

import { Note as NoteType } from 'types/Note';

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [deletedNoteId, setDeletedNoteId] = useState<string>('');

  const sessionId = useSession();
  const { getNotes, getDeletedNotes, deleteNote, updateNote } = useNotes();

  const filterNotes = (unfilteredNotes: NoteType[], deletedNoteIds: string[]) => {
    const filteredNotes = filter(unfilteredNotes, (note) => !deletedNoteIds.includes(note.id));
    setNotes(filteredNotes);
  };

  useEffect(() => {
    const deletedNoteIds = getDeletedNotes();
    getNotes(sessionId).then((fetchedNotes) => filterNotes(fetchedNotes, deletedNoteIds));
    // we want to run this effect only on the 1st component render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = () => {
    postNote(sessionId).then((note) => {
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
    });
  };

  const handleOnBinIconClick = (noteId: string) => () => {
    setDeletedNoteId(noteId);
    setTimeout(() => {
      const deletedNoteIds = deleteNote(noteId);
      filterNotes(notes, deletedNoteIds);
      // add delay to play pop out animation
    }, 300);
  };

  const handleOnValueChange = (noteId: string) => (value: string) =>
    updateNote(sessionId, noteId, value);

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
