import { json } from '@sveltejs/kit'
import book from '../../../../../data/book.json'


export async function GET(params: { url: URL }) {
  const query: string = params.url.searchParams.get('query') || "NULL";
  const chunk_size: number = (params.url.searchParams.get('chunk_size') || -1) as number;

  const match = book.text.match(query)
  console.log(book.text)
  console.log(query)
  console.log(match)
  return json(match);
}
