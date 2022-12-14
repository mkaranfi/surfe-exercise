import { useEffect, useState } from 'react';
import { filter, map } from 'lodash';

import 'components/notes/Notes.style.scss';

import Note from 'components/notes/Note';
import { useSession } from 'hooks/useSession';
import { postNote } from 'api/api-client';
import { useNotes } from 'hooks/useNotes';

import { Note as NoteType } from 'types/Note';

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
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
    const deletedNoteIds = deleteNote(noteId);
    filterNotes(notes, deletedNoteIds);
  };

  const handleOnValueChange = (noteId: string) => (value: string) =>
    updateNote(sessionId, noteId, value);

  const mappedNotes = map(notes, ({ id, body }) => (
    <Note
      key={`note-id-${id}`}
      onBinIconClick={handleOnBinIconClick(id)}
      onValueChangeCallback={handleOnValueChange(id)}
      content={body}
    />
  ));

  return (
    <div className="notes-container" onClick={handleOnClick}>
      {mappedNotes}
    </div>
  );
};

export default Notes;
