import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextAnalysisService {
  private readonly WORDS_PER_MINUTE = 200;

  countCharacters(text: string, excludeSpaces: boolean): number {
    return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
  }

  countWords(text: string): number {
    const trimmedText = text.trim();
    return trimmedText ? trimmedText.split(/\s+/).length : 0;
  }

  countSentences(text: string): number {
    const trimmedText = text.trim();
    if (!trimmedText) return 0;
    const matches = trimmedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
    return matches ? matches.length : 0;
  }

  getReadingTime(wordCount: number): string {
    const minutes = wordCount === 0 ? 0 : Math.ceil(wordCount / this.WORDS_PER_MINUTE);
    const label = minutes === 1 ? "minute" : "minutes";
    return `Approx. reading time: ${minutes} ${label}`;
  }

  getLetterDensity(text: string) {
    const letters = text.toUpperCase().match(/[A-Z]/g) || [];
    const totals: { [key: string]: number } = {};

    for (const letter of letters) {
      totals[letter] = (totals[letter] || 0) + 1;
    }

    return Object.entries(totals)
      .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))
      .map(([letter, count]) => ({
        letter,
        count,
        percentage: (count / letters.length) * 100,
      }));
  }
}