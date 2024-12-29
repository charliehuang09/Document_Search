import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export function GET() {
  const data = {
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  };
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
