


import type { VercelRequest, VercelResponse } from "@vercel/node";

const allowedExtensions = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }

  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return res.status(500).send("BACKEND_URL is not configured");
  }

  const rawPath = req.query.path;
  const imagePath = Array.isArray(rawPath) ? rawPath[0] : rawPath;

  if (
    !imagePath ||
    imagePath.startsWith("/") ||
    imagePath.includes("\\") ||
    imagePath.split("/").some(
      (part) => !part || part === "." || part === ".."
    ) ||
    !allowedExtensions.test(imagePath)
  ) {
    return res.status(400).send("Invalid image path");
  }

  try {
    const backendOrigin = new URL(backendUrl).origin;
    const safePath = imagePath
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");

    const response = await fetch(
      `${backendOrigin}/media/${safePath}`,
      { method: req.method }
    );

    if (!response.ok) {
      return res.status(response.status).send("Image request failed");
    }

    const contentType = response.headers.get("content-type") || "";

    if (
      !/^image\/(png|jpeg|webp|gif|avif|svg\+xml)$/i.test(contentType)
    ) {
      return res.status(415).send("Unsupported image content type");
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400"
    );

    if (req.method === "HEAD") {
      return res.status(200).end();
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return res.status(200).send(buffer);
  } catch {
    return res.status(502).send("Could not load image");
  }
}
