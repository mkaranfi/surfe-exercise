import { useEffect, useState } from 'react';
import { filter } from 'lodash';

import { fetchNotes, postNote, putNote } from 'api/notes-api-client';

import { useSession } from 'hooks/useSession';

import { Note as NoteType, Note } from 'types/Note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const sessionId = useSession();

  const filterNotes = (unfilteredNotes: NoteType[], deletedNoteIds: string[]) =>
    filter(unfilteredNotes, (note) => !deletedNoteIds.includes(note.id));

  const getDeletedNotes = (): string[] => {
    const deletedNoteIdsString: string | null = localStorage.getItem('deletedNoteIds');
    let deletedNoteIds = [];
    if (deletedNoteIdsString != null) {
      deletedNoteIds = JSON.parse(deletedNoteIdsString);
    }
    return deletedNoteIds;
  };

  useEffect(() => {
    fetchNotes(sessionId).then((notes: Note[]) => {
      const deletedNoteIds = getDeletedNotes();
      const filteredNotes = filterNotes(notes, deletedNoteIds);
      setNotes(filteredNotes);
    });
  }, [sessionId]);

  const updateNotes = (updatedNotes: Note[]) => setNotes(updatedNotes);

  const deleteNote = (noteId: string) => {
    const deletedNoteIds = getDeletedNotes();
    const updatedDeletedNoteIds = [...deletedNoteIds, noteId];
    localStorage.setItem('deletedNoteIds', JSON.stringify(updatedDeletedNoteIds));
    const filteredNotes = filterNotes(notes, updatedDeletedNoteIds);
    setNotes(filteredNotes);
  };

  const createNote = () => {
    postNote(sessionId).then((note) => updateNotes([...notes, note]));
  };

  const updateNote = (noteId: string, noteContent: string) =>
    putNote(sessionId, noteId, noteContent);

  return { notes, createNote, updateNote, getDeletedNotes, deleteNote };
};
