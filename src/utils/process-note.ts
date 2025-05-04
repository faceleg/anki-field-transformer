
import { Cheerio, load } from 'cheerio';
import { NoteForProcessing, updateNote } from '../anki';
import sleep from './sleep';
import { wrapPinyinWithToneClassesAndHTML } from './util-functions/wrap-pinyin-with-tone-classes-and-html';
import { addSpacesToPinyin } from './util-functions/add-spaces-to-pinyin';

export interface ProcessNote {
    (noteForProcessing: NoteForProcessing): Promise<void>;
}

function replaceStringWithBlanks(html: string, strToReplace: string): string {
    // Create a string of underscores with the same length as strToReplace
    const blankString = '_'.repeat(strToReplace.length);
    // Wrap the blankString in the span tag
    const replacement = `<span class="char_example_blank">${blankString}</span>`;
    // Replace all occurrences of strToReplace in the html with the replacement
    return html.split(strToReplace).join(replacement);
}
function updateClassNames(html: string): string {
    // Replace the class name "char_example" with "char_examples_blank"
    let updatedHtml = html.replace(/class="char_example"/g, 'class="char_examples_blank"');
    // Replace the class name "char_examples-parts-of-speech" with "char_examples_blank-parts-of-speech"
    // updatedHtml = updatedHtml.replace(/class="char_examples-parts-of-speech"/g, 'class="char_examples_blank-parts-of-speech"');
    return updatedHtml;
}

export const primeProcessNote = (): ProcessNote => {
    return async (noteForProcessing: NoteForProcessing): Promise<void> => {
        const noteId = noteForProcessing.noteId;
        const examplesBlank = updateClassNames(replaceStringWithBlanks(noteForProcessing.Examples, noteForProcessing.Simplified));
        // wrapPinyinWithToneClassesAndHTML(addSpacesToPinyin(noteForProcessing.Pinyin))
        console.log({
            simplified: noteForProcessing.Simplified,
            examples: noteForProcessing.Examples,
            examplesBlank
        })
        const noteForAnki = {
            id: +noteId,
            fields: {
                ExamplesBlank: examplesBlank,
            },
        };

        await updateNote(noteForAnki);
        await sleep(50);
    };
};
