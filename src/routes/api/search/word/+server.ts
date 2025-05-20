import { json } from '@sveltejs/kit'
import book from '../../../../../data/book.json'

function computeLPSArray(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpSearch(text: string, pattern: string): number[] {
    const matches: number[] = [];
    if (!pattern || !text) return matches;
    
    const lps = computeLPSArray(pattern);
    let i = 0;
    let j = 0;
    
    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        if (j === pattern.length) {
            matches.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return matches;
}

function getPageNum(target : number) {
  let left = 0;
  const arr : number[] = book.pages_numbers;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found at index mid
    } else if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }
  return left;
}

export async function GET(params: { url: URL }) {
    const query: string = params.url.searchParams.get('query') || "NULL";
    const chunk_size: number = (params.url.searchParams.get('chunk_size') || -1) as number;
    const limit: number = (params.url.searchParams.get('limit') || -1) as number;

    const matches = kmpSearch(book.text, query);
    
    const limitedMatches = limit > 0 ? matches.slice(0, limit) : matches;
    
    if (chunk_size > 0) {
        const results : Result = limitedMatches.map(matchIndex => {
            const start = Math.max(0, matchIndex - chunk_size);
            const end = Math.min(book.text.length, matchIndex + query.length + chunk_size);
            return {
                idx: getPageNum(matchIndex),
                data: book.text.slice(start, end)
            };
        });
        return json(results);
    }
    console.log(results);

    return json(limitedMatches);
}

