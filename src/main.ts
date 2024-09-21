import { NoteForProcessing, fetchNotesFromAnki } from './anki';
import { concurrentProcessor } from './utils/concurrent-processor';
import { primeProcessNote } from './utils/process-note';

import * as dotenv from 'dotenv-extended';

// Load environment variables from .env file
dotenv.load({
    path: '.env.local',
    errorOnMissing: true,
    errorOnExtra: true,
});

// Define types for your environment variables
interface EnvVariables {
    ANKI_DECK: string;
    MAX_CONCURRENCY: string;
}

const { ANKI_DECK, MAX_CONCURRENCY }: EnvVariables = process.env as unknown as EnvVariables;

function containsHTML(str: string): boolean {
  const htmlRegex = /<[^>]+>/; // Regular expression to match HTML tags
  return htmlRegex.test(str);   // Returns true if the string contains HTML
}
(async function (): Promise<void> {
    console.log(`Processing cards from Anki deck "${ANKI_DECK}"...`);

    const notes = await fetchNotesFromAnki(ANKI_DECK, (value: NoteForProcessing, index: number, array: NoteForProcessing[]) => {
        return value.Pinyin.length > 3 && !containsHTML(value.Pinyin)
        // return !value.Pinyin.includes(' ');
    });
        console.log(`Found ${notes.length} notes eligible for fetching`);

        await concurrentProcessor(notes, parseInt(MAX_CONCURRENCY as string), primeProcessNote());
})();
