export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const correctPassword = process.env.TOOL_PASSWORD;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!correctPassword || !anthropicKey) {
    return res.status(500).json({ error: 'Server not configured. Set TOOL_PASSWORD and ANTHROPIC_API_KEY in Vercel environment variables.' });
  }

  if (password !== correctPassword) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  return res.status(200).json({ success: true, key: anthropicKey });
}
