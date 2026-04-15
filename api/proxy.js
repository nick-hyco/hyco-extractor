export default async function handler(req, res) {
  const params = new URLSearchParams(req.query).toString();
  const url = `https://api.grail.moe/notes/approved?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
