import type { NoteForProcessing } from '../anki';

export const filterNoteContent = (input: string): string => {
    return input // https://chat.openai.com/chat/7e66101d-3410-4570-9b5d-2b65aac583cf
        .replace(/\([^)]*\)/g, '') // remove content in parentheses
        .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML tags
        .replace(/[\u4e00-\u9fa5]（[\u4e00-\u9fa5]+）/g, '') // Remove chinese parentheses
        .trim();
};
