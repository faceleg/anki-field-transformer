// Function to wrap each Pinyin syllable in HTML with tone classes
export function wrapPinyinWithToneClassesAndHTML(pinyin: string): string {
  const syllables = pinyin.split(/\s+/); // Split the Pinyin string into syllables
  const htmlWrappedSyllables = syllables.map(syllable => {
    let toneClass;

    // Check for tone marks and assign tone classes
    if (syllable.match(/[āēōīū]/) || syllable.includes('v')) {
      toneClass = 't1'; // First tone (high level)
    } else if (syllable.match(/[áéíóú]/) || syllable.includes('v')) {
      toneClass = 't2'; // Second tone (rising)
    } else if (syllable.match(/[ǎěǐǒǔ]/) || syllable.includes('v')) {
      toneClass = 't3'; // Third tone (falling-rising)
    } else if (syllable.match(/[àèìòù]/) || syllable.includes('v')) {
      toneClass = 't4'; // Fourth tone (falling)
    } else {
      toneClass = 't5'; // Neutral tone (no tone mark)
    }

    return `<span class="pinYinWrapper"><span class="${toneClass}">${syllable}</span></span>`;
  });

  return htmlWrappedSyllables.join(' '); // Join the wrapped syllables with spaces
}
