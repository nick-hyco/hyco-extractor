export default async function handler(req, res) {
  const { file } = req.query;
  if (!file) return res.status(400).json({ error: 'No file specified' });

  try {
    const response = await fetch(`https://document.grail.moe/${file}`);
    if (!response.ok) return res.status(response.status).json({ error: 'PDF fetch failed' });

    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
