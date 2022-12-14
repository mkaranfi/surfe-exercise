import { fetchNotes, postNote, putNote } from 'api/api-client';

import { Note } from 'types/Note';

export const useNotes = () => {
  const getDeletedNotes = (): string[] => {
    const deletedNoteIdsString: string | null = localStorage.getItem('deletedNoteIds');
    let deletedNoteIds = [];
    if (deletedNoteIdsString != null) {
      deletedNoteIds = JSON.parse(deletedNoteIdsString);
    }
    return deletedNoteIds;
  };

  const deleteNote = (noteId: string) => {
    const deletedNoteIds = getDeletedNotes();
    const updatedDeletedNotes = [...deletedNoteIds, noteId];
    localStorage.setItem('deletedNoteIds', JSON.stringify(updatedDeletedNotes));
    return updatedDeletedNotes;
  };

  const getNotes = async (sessionId: string): Promise<Note[]> => await fetchNotes(sessionId);

  const createNewNote = (sessionId: string) => {
    postNote(sessionId);
  };

  const updateNote = (sessionId: string, noteId: string, noteContent: string) => {
    putNote(sessionId, noteId, noteContent);
  };

  return { getNotes, createNewNote, updateNote, getDeletedNotes, deleteNote };
};
