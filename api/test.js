export default async function handler(req, res) {
  const { execSync } = await import('child_process');
  let gs = 'not found';
  let convert = 'not found';
  try { gs = execSync('gs --version').toString().trim(); } catch(e) {}
  try { convert = execSync('convert --version').toString().split('\n')[0]; } catch(e) {}
  res.json({ ghostscript: gs, imagemagick: convert, node: process.version });
}
