export default async function handler(req, res) {
  try {
    // Get the path after /api/
    const path = req.url.replace(/^\/api\//, '');

    // Construct your MonsterASP endpoint
    const targetUrl = `http://chrisjhone.runasp.net/api/${path}`;

    console.log(`Proxying request to: ${targetUrl}`);

    // Forward the request to your backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        // forward auth headers or others if needed
        'Authorization': req.headers['authorization'] || '',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // Pass back the backend’s response
    const data = await response.text();

    res.status(response.status).send(data);

  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}
