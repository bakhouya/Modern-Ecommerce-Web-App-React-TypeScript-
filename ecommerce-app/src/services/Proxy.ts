import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const apiUrl = process.env.VITE_API_URL;

  if (!apiUrl) {
    return res.status(500).send("VITE_API_URL is not configured");
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }

  const rawPath = req.query.path;
  const imagePath = Array.isArray(rawPath)
    ? rawPath.join("/")
    : rawPath;

  if (
    !imagePath ||
    imagePath.split("/").some(
      (part) => !part || part === "." || part === ".."
    ) ||
    !/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(imagePath)
  ) {
    return res.status(400).send("Invalid image path");
  }

  try {
    // VITE_API_URL فيه /api/؛ نستعمل أصل السيرفر فقط
    const backendOrigin = new URL(apiUrl).origin;
    const imageUrl = new URL(
      `/media/${imagePath}`,
      backendOrigin
    );

    const response = await fetch(imageUrl.toString(), {
      method: req.method,
    });

    if (!response.ok) {
      return res.status(response.status).send("Image not found");
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.startsWith("image/")) {
      return res.status(415).send("Invalid image type");
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