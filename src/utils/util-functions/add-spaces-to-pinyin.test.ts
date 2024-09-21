import { describe, expect, test } from '@jest/globals';
import type { NoteForProcessing } from '../../anki';
import { addSpacesToPinyin } from './add-spaces-to-pinyin';

describe('addSpacesToPinyin', () => {
    test('addSpacesToPinyin', () => {
        expect(addSpacesToPinyin('mò')).toEqual('mò');
        expect(addSpacesToPinyin('mòrèn')).toEqual('mò rèn');
        expect(addSpacesToPinyin('hémùgòngchù')).toEqual('hé mù gòng chù');
        expect(addSpacesToPinyin('hēidǐbáizì')).toEqual('hēi dǐ bái zì');
        expect(addSpacesToPinyin('hēi dǐbáizì')).toEqual('hēi dǐ bái zì');
        expect(addSpacesToPinyin('hēidǐbái zì')).toEqual('hēi dǐ bái zì');
        expect(addSpacesToPinyin('yínsè')).toEqual('yín sè');
        expect(addSpacesToPinyin('qīnglv̀sè')).toEqual('qīng lv̀ sè');
    });
});
