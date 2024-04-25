import { NoteForProcessing, updateNote } from '../anki';
import sleep from './sleep';

export interface ProcessNote {
    (noteForProcessing: NoteForProcessing): Promise<void>;
}

export const primeProcessNote = (): ProcessNote => {
    return async (noteForProcessing: NoteForProcessing): Promise<void> => {
        const noteId = noteForProcessing.noteId;
        const simplifiedText = noteForProcessing.Simplified
        const spacesRegex = /\s+/g;
        const nbspRegex = /&nbsp;/g;
        if (spacesRegex.test(simplifiedText) || nbspRegex.test(simplifiedText)) {
            const noteForAnki = {
                id: +noteId,
                fields: {
                    Simplified: noteForProcessing.Simplified
                        .replace(/\s+/g, '')
                        .replace(nbspRegex, ''),
                    // Traditional: noteForProcessing.Traditional.replace(/\s+/g, ''),
                },
            };

            await updateNote(noteForAnki);
            console.log(`Updated Anki with "${noteForAnki.fields.Simplified}", original: "${noteForProcessing.Simplified}"`);
            await sleep(350);
        } else {
            console.log(`No spaces found in ${simplifiedText}`);
        }
    };
};
