export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await req.json();
  const correctPassword = process.env.TOOL_PASSWORD;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!correctPassword || !anthropicKey) {
    return new Response(JSON.stringify({ error: 'Not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (body.pw !== correctPassword) {
    return new Response(JSON.stringify({ error: 'Incorrect password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, key: anthropicKey }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
