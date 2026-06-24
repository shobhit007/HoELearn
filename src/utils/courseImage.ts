const DUMMYJSON_CDN = "cdn.dummyjson.com";

const dataUriCache = new Map<string, string>();

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return globalThis.btoa(binary);
}

export function needsNativeImageFetch(uri: string): boolean {
  return uri.includes(DUMMYJSON_CDN);
}

async function fetchImageDataUri(uri: string): Promise<string | null> {
  try {
    const response = await fetch(uri);
    const contentType =
      response.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
    const buffer = await response.arrayBuffer();

    if (!buffer.byteLength) {
      return null;
    }

    return `data:${contentType};base64,${arrayBufferToBase64(buffer)}`;
  } catch {
    return null;
  }
}

export async function resolveNativeImageUri(
  uri: string,
): Promise<string | null> {
  if (!uri.trim()) return null;

  if (!needsNativeImageFetch(uri)) {
    return uri;
  }

  const cached = dataUriCache.get(uri);
  if (cached) return cached;

  const dataUri = await fetchImageDataUri(uri);
  if (dataUri) {
    dataUriCache.set(uri, dataUri);
  }

  return dataUri;
}

export function getCourseImageUrl(course: {
  thumbnail?: string;
  images?: string[];
}): string {
  return course.thumbnail?.trim() || course.images?.[0]?.trim() || "";
}
