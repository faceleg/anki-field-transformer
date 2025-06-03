export function convertPinYinWithNumbersToToneClassesAndHtml(input: string): string {
    const toneMap: Record<string, string[]> = {
      a: ['ā', 'á', 'ǎ', 'à'],
      e: ['ē', 'é', 'ě', 'è'],
      i: ['ī', 'í', 'ǐ', 'ì'],
      o: ['ō', 'ó', 'ǒ', 'ò'],
      u: ['ū', 'ú', 'ǔ', 'ù'],
      ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
    };
  
    function applyTone(syllable: string, tone: number): string {
      let base = syllable.toLowerCase();
      base = base.replace(/[1-5]$/, '');
  
      let vowelToMark: string | null = null;
  
      if (base.includes('a')) vowelToMark = 'a';
      else if (base.includes('o')) vowelToMark = 'o';
      else if (base.includes('e')) vowelToMark = 'e';
      else if (base.includes('iu')) vowelToMark = 'u';
      else if (base.includes('ui')) vowelToMark = 'i';
      else {
        for (const v of ['i', 'u', 'ü']) {
          if (base.includes(v)) {
            vowelToMark = v;
            break;
          }
        }
      }
  
      if (tone >= 1 && tone <= 4 && vowelToMark) {
        const tonedVowel = toneMap[vowelToMark][tone - 1];
        const regex = new RegExp(vowelToMark);
        base = base.replace(regex, tonedVowel);
      }
  
      return base;
    }
  
    return input.trim().split(/\s+/).map((word: string) => {
      const match = word.match(/^(.+?)([1-5])$/);
      if (match) {
        const [, syllable, toneStr] = match;
        const tone = parseInt(toneStr, 10);
        const toned = applyTone(syllable, tone);
        return `<span class="tone${tone}">${toned}</span>`;
      } else {
        return word;
      }
    }).join(' ');
  }
  