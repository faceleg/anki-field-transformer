import { describe, expect, test } from '@jest/globals';
import { filterNoteContent } from './note-text-filter';
import type { NoteForProcessing } from '../anki';

describe('Note content filtering', () => {
    test('filterNoteContent', () => {
        // expect(
        //     filterNoteContent('der Ton<br><br>(Das Bier gibt es in großen Einliterkrügen aus Glas oder Ton.)'),
        // ).toEqual('der Ton');
        // expect(filterNoteContent('der Führerschein')).toEqual('der Führerschein');
        // expect(filterNoteContent('der Kaufmann, die Kauffrau')).toEqual('der Kaufmann, die Kauffrau');
        // expect(filterNoteContent('anschwellen (schwillt an, o, i. o)')).toEqual('anschwellen');
        // expect(
        //     filterNoteContent('die Schwellung, die Anschwellung<br><br>(die Anschwellung nach einem Bienenstich)'),
        // ).toEqual('die Schwellung, die Anschwellung');
        // expect(filterNoteContent('(j-m/für j-n) den Daumen drücken<br><br>(Ich drücke dir die Daumen.)')).toEqual(
        //     'den Daumen drücken',
        // );
    });
});
