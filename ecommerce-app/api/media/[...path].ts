


import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest,res: VercelResponse) {

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }

  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {return res.status(500).send("BACKEND_URL is not configured");}

  const rawPath = req.query.path;
  const imagePath = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;

  if ( !imagePath || imagePath.split("/").some((part) => !part || part === "." || part === "..") || !/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(imagePath)) {
    return res.status(400).send("Invalid image path");
  }

  try {
    const backendOrigin = new URL(backendUrl).origin;
    const response = await fetch(`${backendOrigin}/media/${imagePath}`, { method: req.method });
    if (!response.ok) {return res.status(response.status).end();}

    const contentType = response.headers.get("content-type") || "";

    if (!/^image\/(png|jpeg|webp|gif|avif|svg\+xml)$/i.test(contentType)) {return res.status(415).end();}

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
    if (req.method === "HEAD") {return res.status(200).end();}

    const buffer = Buffer.from(await response.arrayBuffer());
    return res.status(200).send(buffer);
    
  } catch {
    return res.status(502).send("Could not load image");
  }
}
