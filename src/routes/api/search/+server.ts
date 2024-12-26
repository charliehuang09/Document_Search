export async function POST(params: { request: Request }) {
	const { query } = await params.request.json();

	// const completion_manager = new ChatbotCompletion(import.meta.env.VITE_OPENAI_API_KEY!, {
	// 	openai_model: import.meta.env.VITE_OPENAI_MODEL_NAME!,
	// 	verbose: true,
	// 	do_history: true,
	// 	generate_data: false,
	// 	use_summarybot: true
	// });
	// await completion_manager.setup();
	//
	// const output = await completion_manager.query(chatHistory, input);

	return new Response(JSON.stringify(query), {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
// Tomcat
// Servlet 4.0
// Interceptor
