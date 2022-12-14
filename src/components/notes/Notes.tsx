import { useState } from 'react';
import { map, remove } from 'lodash';

import 'components/notes/Notes.style.scss';

import Note from 'components/notes/Note';
import { useRandomUUID } from 'hooks/useRandomUUID';

const Notes = () => {
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const generateUUID = useRandomUUID();

  const handleOnClick = () => {
    const newNoteId = generateUUID();
    const updatedNoteIds = [...noteIds, newNoteId];
    setNoteIds(updatedNoteIds);
  };

  const handleOnNoteBinClick = (noteId: string) => () => {
    const updatedNoteIds = remove(noteIds, (value) => value !== noteId);
    setNoteIds(updatedNoteIds);
  };

  const notes = map(noteIds, (noteId) => (
    <Note key={noteId} onBinClick={handleOnNoteBinClick(noteId)} />
  ));

  return (
    <div className="notes-container" onClick={handleOnClick}>
      {notes}
    </div>
  );
};

export default Notes;
