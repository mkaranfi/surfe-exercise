import { HttpRequestMethod } from 'utilities/enums';
import { Note } from 'types/Note';

const getNotesAPIUrl = (sessionId: string) => `https://challenge.surfe.com/${sessionId}/notes`;
const getNoteAPIUrl = (sessionId: string, noteId: string) =>
  `${getNotesAPIUrl(sessionId)}/${noteId}`;

const createNoteBody = (noteContent: string) => JSON.stringify({ body: noteContent });
const initialNoteBody = createNoteBody('New note');

const headers = new Headers({
  'Content-Type': 'application/json',
});

export const fetchNotes = (sessionId: string): Promise<Note[]> =>
  fetch(getNotesAPIUrl(sessionId))
    .then((response) => response.json())
    .catch((error) => {
      console.log('Error occurred while fetching the notes: ', error);
      return [];
    });

export const postNote = (sessionId: string) =>
  fetch(getNotesAPIUrl(sessionId), {
    headers,
    method: HttpRequestMethod.POST,
    body: initialNoteBody,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('Error occurred while creating the note: ', error);
      return [];
    });

export const putNote = (sessionId: string, noteId: string, updatedNote: string) =>
  fetch(getNoteAPIUrl(sessionId, noteId), {
    headers,
    method: HttpRequestMethod.PUT,
    body: createNoteBody(updatedNote),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('Error occurred while updating the note: ', error);
      return [];
    });
