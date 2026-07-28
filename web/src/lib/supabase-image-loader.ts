import type { ImageLoaderProps } from "next/image";

const SUPABASE_HOST_SUFFIX = "supabase.co";
const PUBLIC_OBJECT_PREFIX = "/storage/v1/object/public/";
const RENDER_OBJECT_PREFIX = "/storage/v1/render/image/public/";

function toRenderedImagePath(pathname: string): string {
  if (!pathname.includes(PUBLIC_OBJECT_PREFIX)) {
    return pathname;
  }

  return pathname.replace(PUBLIC_OBJECT_PREFIX, RENDER_OBJECT_PREFIX);
}

export function supabaseImageLoader({ src, width, quality }: ImageLoaderProps): string {
  try {
    if (!src.startsWith("http://") && !src.startsWith("https://")) {
      return src;
    }

    const parsed = new URL(src);

    if (!parsed.hostname.endsWith(SUPABASE_HOST_SUFFIX)) {
      return src;
    }

    parsed.pathname = toRenderedImagePath(parsed.pathname);
    parsed.searchParams.set("width", String(width));

    if (quality) {
      parsed.searchParams.set("quality", String(quality));
    }

    return parsed.toString();
  } catch {
    return src;
  }
}
