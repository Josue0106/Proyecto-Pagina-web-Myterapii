import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase-admin";

type MediaAssetRow = {
  id: string;
  slot: string;
  file_url: string;
  alt_text: string | null;
  is_active: boolean;
  orden: number;
  media_type: "logo" | "image" | "video";
  mime_type: string | null;
  width_px: number | null;
  height_px: number | null;
  device_variant: "universal" | "mobile" | "tablet" | "desktop" | "retina" | null;
  actualizado_en: string;
};

export type MediaAsset = {
  id: string;
  slot: string;
  fileUrl: string;
  altText: string | null;
  order: number;
  mediaType: "logo" | "image" | "video";
  mimeType: string | null;
  widthPx: number | null;
  heightPx: number | null;
  deviceVariant: "universal" | "mobile" | "tablet" | "desktop" | "retina" | null;
};

export type DeviceVariant = "universal" | "mobile" | "tablet" | "desktop" | "retina";

type SupabaseTransformOptions = {
  width: number;
  quality: number;
  format: "webp" | "jpg" | "png";
};

export function isLocalAssetPath(value: string): boolean {
  return value.startsWith("/") || value.startsWith("./") || value.startsWith("../") || value.startsWith("data:");
}

function mapMediaAsset(row: MediaAssetRow): MediaAsset {
  return {
    id: row.id,
    slot: row.slot,
    fileUrl: row.file_url,
    altText: row.alt_text,
    order: row.orden,
    mediaType: row.media_type,
    mimeType: row.mime_type,
    widthPx: row.width_px,
    heightPx: row.height_px,
    deviceVariant: row.device_variant,
  };
}

const readActiveMediaAssets = unstable_cache(
  async (slot: string): Promise<MediaAsset[]> => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return [];
    }

    try {
      const supabase = createAdminClient();

      const { data, error } = await supabase
        .from("media_assets")
        .select(
          "id, slot, file_url, alt_text, is_active, orden, media_type, mime_type, width_px, height_px, device_variant, actualizado_en",
        )
        .eq("slot", slot)
        .eq("is_active", true)
        .order("orden", { ascending: true })
        .order("actualizado_en", { ascending: false })
        .returns<MediaAssetRow[]>();

      if (error || !data?.length) {
        return [];
      }

      return data.filter((item) => Boolean(item.file_url)).map(mapMediaAsset);
    } catch {
      return [];
    }
  },
  ["media-assets-by-slot"],
  { revalidate: 300 },
);

export async function getMediaAsset(slot: string): Promise<MediaAsset | null> {
  const assets = await readActiveMediaAssets(slot);
  return assets[0] ?? null;
}

export async function getMediaAssets(slot: string, limit?: number): Promise<MediaAsset[]> {
  const assets = await readActiveMediaAssets(slot);
  if (!limit || limit <= 0) {
    return assets;
  }

  return assets.slice(0, limit);
}

export async function getMediaAssetUrl(slot: string, fallbackUrl: string): Promise<string> {
  if (isLocalAssetPath(fallbackUrl)) {
    return fallbackUrl;
  }

  const asset = await getMediaAsset(slot);
  return asset?.fileUrl ?? fallbackUrl;
}

export async function getMediaAssetUrls(slot: string, fallbackUrls: string[] = []): Promise<string[]> {
  const assets = await getMediaAssets(slot);
  if (assets.length === 0) {
    return fallbackUrls;
  }

  return assets.map((asset) => asset.fileUrl);
}

export async function getMediaAssetUrlForVariant(
  slot: string,
  fallbackUrl: string,
  variant: DeviceVariant = "universal",
): Promise<string> {
  const assets = await getMediaAssetsForVariant(slot, variant, 1);
  return assets[0]?.fileUrl ?? (await getMediaAssetUrl(slot, fallbackUrl));
}

export async function getMediaAssetsForVariant(
  slot: string,
  variant: DeviceVariant,
  limit?: number,
): Promise<MediaAsset[]> {
  const assets = await getMediaAssets(slot);

  const exactMatches = assets.filter((asset) => asset.deviceVariant === variant);
  const universalMatches = assets.filter(
    (asset) => asset.deviceVariant === "universal" || asset.deviceVariant === null,
  );

  const selected = exactMatches.length > 0 ? exactMatches : universalMatches;

  if (!limit || limit <= 0) {
    return selected;
  }

  return selected.slice(0, limit);
}

function optimizeSupabaseImageUrl(imageUrl: string, options: SupabaseTransformOptions): string {
  try {
    const parsedUrl = new URL(imageUrl);

    if (!parsedUrl.hostname.endsWith("supabase.co")) {
      return imageUrl;
    }

    const objectPrefix = "/storage/v1/object/public/";
    const renderPrefix = "/storage/v1/render/image/public/";

    if (parsedUrl.pathname.includes(objectPrefix)) {
      parsedUrl.pathname = parsedUrl.pathname.replace(objectPrefix, renderPrefix);
    }

    parsedUrl.searchParams.set("width", String(options.width));
    parsedUrl.searchParams.set("quality", String(options.quality));
    parsedUrl.searchParams.set("format", options.format);

    return parsedUrl.toString();
  } catch {
    return imageUrl;
  }
}

export async function getSlotImageUrl(
  slot: string,
  fallbackUrl: string,
  variant: DeviceVariant = "universal",
  options: { width?: number; quality?: number; format?: "webp" | "jpg" | "png" } = {},
): Promise<string> {
  if (isLocalAssetPath(fallbackUrl)) {
    return fallbackUrl;
  }

  const assets = await getMediaAssetsForVariant(slot, variant, 1);

  if (!assets[0]?.fileUrl) {
    return fallbackUrl;
  }

  return optimizeSupabaseImageUrl(assets[0].fileUrl, {
    width: options.width ?? 1920,
    quality: options.quality ?? 70,
    format: options.format ?? "jpg",
  });
}

export async function getHeroBackgroundImageUrl(
  fallbackUrl: string,
  variant: DeviceVariant = "universal",
): Promise<string> {
  return getSlotImageUrl("hero_background", fallbackUrl, variant, {
    width: 1920,
    quality: 70,
    format: "jpg",
  });
}
