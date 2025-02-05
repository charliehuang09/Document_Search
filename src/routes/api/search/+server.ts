import { json } from '@sveltejs/kit';
import { QdrantClient } from '@qdrant/qdrant-js';
import { OpenAIEmbeddings } from "@langchain/openai";
import { OPENAI_API_KEY } from '$env/static/private';

export async function GET(params : {url : URL}) {
    const query = params.url.searchParams.get('query');
    const collection = params.url.searchParams.get('collection');
    const limit = params.url.searchParams.get('limit');
    console.log(query);
    if (query == null){
      console.log("Invalid query");
      return json("INVALID");
    }
    if (collection == null){
      console.log("Invalid collection");
      return json("INVALID");
    }
    if (limit == null){
      console.log("Invalid limit");
      return json("INVALID");
    }

    const client = new QdrantClient({url: "http://localhost:6333"})
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

    console.log(qdrant_results)
    
    return json(qdrant_results);
}
