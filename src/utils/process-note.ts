
import { Cheerio, load } from 'cheerio';
import { NoteForProcessing, updateNote } from '../anki';
import sleep from './sleep';
import { wrapPinyinWithToneClassesAndHTML } from './util-functions/wrap-pinyin-with-tone-classes-and-html';
import { addSpacesToPinyin } from './util-functions/add-spaces-to-pinyin';

export interface ProcessNote {
    (noteForProcessing: NoteForProcessing): Promise<void>;
}

export const primeProcessNote = (): ProcessNote => {
    return async (noteForProcessing: NoteForProcessing): Promise<void> => {
        console.log(noteForProcessing.Pinyin)
        const noteId = noteForProcessing.noteId;
        console.log({
            original: noteForProcessing.Pinyin,
            updated: wrapPinyinWithToneClassesAndHTML(addSpacesToPinyin(noteForProcessing.Pinyin))
        })
        const noteForAnki = {
            id: +noteId,
            fields: {
                Pinyin: wrapPinyinWithToneClassesAndHTML(addSpacesToPinyin(noteForProcessing.Pinyin)),
            },
        };

        await updateNote(noteForAnki);
        await sleep(50);
    };
};
