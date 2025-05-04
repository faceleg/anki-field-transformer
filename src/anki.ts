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
    Pinyin: NotesInfoItemField;
    English: NotesInfoItemField;
    Sound: NotesInfoItemField;
}

export interface NoteForProcessing {
    noteId: NoteId;
    Examples: string;
    Simplified: string;
    ExamplesBlank: string;
}

export type FilterFunction<T> = (value: T, index: number, array: T[]) => boolean;

/**
 * 
 * @param array (method) Array<NoteForProcessing>.filter<NoteForProcessing>(predicate: (value: NoteForProcessing, index: number, array: NoteForProcessing[]) => value is NoteForProcessing, thisArg?: any): NoteForProcessing[] (+1 overload)

 * @param predicate 
 * @returns 
 */
export async function fetchNotesFromAnki(deckName: string, notesFilter?: FilterFunction<NoteForProcessing>): Promise<NoteForProcessing[]> {
    const notesIds = await findNotes(deckName);

    const notesInfo = await fetchNotesInfo<NoteFields>(notesIds);

    const notesForProcessing = notesInfo.map((note): NoteForProcessing => {
        return {
            noteId: note.noteId,
            Examples: note.fields.Examples.value,
            ExamplesBlank: note.fields.ExamplesBlank.value,
            Simplified: note.fields.Simplified.value,
        };
    });

    const filteredNotes = notesForProcessing.map((note) => {
        return {
            noteId: note.noteId,
            Examples: filterNoteContent(note.Examples),
            ExamplesBlank: filterNoteContent(note.ExamplesBlank),
            Simplified: filterNoteContent(note.Simplified),
        };
    });

    return filteredNotes.filter(notesFilter ? notesFilter : () => true);

}

export interface UpdateNoteFields extends UpdateNoteFieldsFields {
    ExamplesBlank: string;
}

export async function updateNote(noteData: UpdateNoteFieldsNote<UpdateNoteFields>): Promise<void> {
    await updateNoteFields(noteData);
}
