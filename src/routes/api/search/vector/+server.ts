import { json } from '@sveltejs/kit';
import { QdrantClient } from '@qdrant/qdrant-js';
import { OpenAIEmbeddings } from "@langchain/openai";
import { OPENAI_API_KEY } from '$env/static/private';
import type { Result } from '$lib';

export async function GET(params: { url: URL }) {
  console.log("Searching");
  const query = params.url.searchParams.get('query');
  const collection = params.url.searchParams.get('collection');
  const limit = params.url.searchParams.get('limit');
  console.log(query);
  if (query == null) {
    console.log("Invalid query");
    return json("INVALID");
  }
  if (collection == null) {
    console.log("Invalid collection");
    return json("INVALID");
  }
  if (limit == null) {
    console.log("Invalid limit");
    return json("INVALID");
  }

  const client = new QdrantClient({ url: "http://localhost:6333" })
  // const client = new QdrantClient({ url: "http://qdrant:6333" })
  const embeddings_model = new OpenAIEmbeddings({
    apiKey: OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
    model: "text-embedding-3-large",
  });
  const query_embedding = await embeddings_model.embedQuery(query);
  const qdrant_results = await client.search(collection, {
    vector: query_embedding,
    limit: parseInt(limit),
    with_vector: true
  });

  console.log(qdrant_results);
  let results: Result[] = [];
  let index: number = 0
  for (let i = 0; i < qdrant_results.length; i++) {
    console.log(qdrant_results[i].payload!.pageContent)
    if (qdrant_results[i].payload!.pageContent) {
      results.push({
        idx: index,
        data: qdrant_results[i].payload!.pageContent as string
      })

    }
  }

  return json(results);
}
