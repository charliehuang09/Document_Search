import { json, type Cookies } from '@sveltejs/kit';

export async function POST(params: { request: Request }) {
  const request = await params.request.json();
  return json({ status: 201 })
}
