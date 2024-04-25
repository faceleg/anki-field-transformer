import {
    fetchNotesInfo,
    findNotes,
    NoteId,
    NotesInfoItemField,
    NotesInfoItemFields,
    updateNoteFields,
    UpdateNoteFieldsFields,
    UpdateNoteFieldsNote,
} from './anki/api';
import { filterNoteContent } from './anki/note-text-filter';

export interface NoteFields extends NotesInfoItemFields {
    Simplified: NotesInfoItemField;
    // Traditional: NotesInfoItemField;
    Audio: NotesInfoItemField;
    Meaning: NotesInfoItemField;
    Image: NotesInfoItemField;
}

export interface NoteForProcessing {
    noteId: NoteId;
    Simplified: string;
    // Traditional: string;
}

export async function fetchNotesFromAnki(deckName: string): Promise<NoteForProcessing[]> {
    const notesIds = await findNotes(deckName);

    const notesInfo = await fetchNotesInfo<NoteFields>(notesIds);

    // const notesWithoutExamples = notesInfo.filter((note) => note.fields.Examples.value.length === 0);
    const notesForProcessing = notesInfo.map((note): NoteForProcessing => {
        return {
            noteId: note.noteId,
            Simplified: note.fields.Simplified.value,
            // Traditional: note.fields.Traditional.value,
        };
    });

    const filteredNotes = notesForProcessing.map((note) => {
        return {
            noteId: note.noteId,
            Simplified: filterNoteContent(note.Simplified),
            // Traditional: filterNoteContent(note.Traditional),
        };
    });

    return filteredNotes;

}

export interface UpdateNoteFields extends UpdateNoteFieldsFields {
    Simplified: string;
}

export async function updateNote(noteData: UpdateNoteFieldsNote<UpdateNoteFields>): Promise<void> {
    await updateNoteFields(noteData);
}
