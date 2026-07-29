export type SubstackPost = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt?: string;
};

type SubstackFeedResult = {
  publicationUrl: string;
  configured: boolean;
  posts: SubstackPost[];
};

type ProfilePostPayload = {
  id?: number | string;
  title?: string;
  canonical_url?: string;
  slug?: string;
  post_date?: string;
  description?: string;
  subtitle?: string;
  truncated_body_text?: string;
};

type ProfileFeedItem = {
  entity_key?: string;
  post?: ProfilePostPayload;
  context?: {
    timestamp?: string;
  };
  comment?: {
    date?: string;
    post?: ProfilePostPayload;
    attachments?: Array<{
      post?: ProfilePostPayload;
      publication?: {
        subdomain?: string;
      };
    }>;
  };
  publication?: {
    subdomain?: string;
  };
};

type ProfileFeedResponse = {
  items?: ProfileFeedItem[];
};

const FALLBACK_PUBLICATION = "https://substack.com";

function normalizePublicationUrl(raw?: string | null): string | null {
  if (!raw) return null;

  const value = raw.trim();
  if (!value) return null;

  const withProtocol = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;

  try {
    const parsedUrl = new URL(withProtocol);
    parsedUrl.hash = "";
    parsedUrl.search = "";
    parsedUrl.pathname = parsedUrl.pathname.replace(/\/+$/, "");
    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    return withProtocol.replace(/[#?].*$/, "").replace(/\/$/, "");
  }
}

function getFeedCandidates(publicationUrl: string): string[] {
  try {
    const parsedUrl = new URL(publicationUrl);
    const pathname = parsedUrl.pathname.replace(/\/$/, "");
    const profileMatch = pathname.match(/^\/(@[^/]+)$/);

    if (parsedUrl.hostname === "substack.com" && profileMatch?.[1]) {
      const handle = profileMatch[1].slice(1);
      return [
        `https://${handle}.substack.com/feed`,
        `${publicationUrl}/feed`,
        `https://substack.com/@${handle}/feed`,
      ];
    }

    return [`${publicationUrl}/feed`];
  } catch {
    return [`${publicationUrl}/feed`];
  }
}

function getSubstackHandle(publicationUrl: string): string | null {
  try {
    const parsedUrl = new URL(publicationUrl);
    const pathname = parsedUrl.pathname.replace(/\/+$/, "");

    if (parsedUrl.hostname === "substack.com") {
      const profileMatch = pathname.match(/^\/@([^/]+)$/);
      return profileMatch?.[1] ?? null;
    }

    if (parsedUrl.hostname.endsWith(".substack.com")) {
      const [subdomain] = parsedUrl.hostname.split(".");
      if (subdomain && subdomain !== "www") {
        return subdomain;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function stripCData(value: string): string {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toPostId(url: string, title: string): string {
  const base = `${url.trim()}-${title.trim()}`.toLowerCase();
  return base.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getTagValue(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!match?.[1]) return null;
  return decodeEntities(stripCData(match[1]));
}

function parseSubstackFeed(xml: string, limit: number): SubstackPost[] {
  const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));

  return items
    .slice(0, limit)
    .map((item) => {
      const content = item[1];
      const title = getTagValue(content, "title") ?? "Artículo";
      const link = getTagValue(content, "link") ?? FALLBACK_PUBLICATION;
      const descriptionRaw =
        getTagValue(content, "description") ?? getTagValue(content, "content:encoded") ?? "";
      const publishedAt = getTagValue(content, "pubDate") ?? undefined;
      const excerpt = stripHtml(descriptionRaw).slice(0, 180);

      return {
        id: toPostId(link, title),
        title,
        url: link,
        publishedAt,
        excerpt: excerpt || "Leer este artículo en Substack.",
      };
    })
    .filter((post) => post.url);
}

function getAtomLink(content: string): string | null {
  const hrefMatch = content.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i);
  return hrefMatch?.[1] ?? getTagValue(content, "link");
}

function parseSubstackAtomFeed(xml: string, limit: number): SubstackPost[] {
  const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi));

  return entries
    .slice(0, limit)
    .map((entry) => {
      const content = entry[1];
      const title = getTagValue(content, "title") ?? "Artículo";
      const link = getAtomLink(content) ?? FALLBACK_PUBLICATION;
      const summaryRaw =
        getTagValue(content, "summary") ?? getTagValue(content, "content") ?? "";
      const publishedAt =
        getTagValue(content, "published") ?? getTagValue(content, "updated") ?? undefined;
      const excerpt = stripHtml(summaryRaw).slice(0, 180);

      return {
        id: toPostId(link, title),
        title,
        url: link,
        publishedAt,
        excerpt: excerpt || "Leer este artículo en Substack.",
      };
    })
    .filter((post) => post.url);
}

function dedupePosts(posts: SubstackPost[]): SubstackPost[] {
  const seen = new Set<string>();
  const unique: SubstackPost[] = [];

  for (const post of posts) {
    const key = post.url || post.id;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(post);
  }

  return unique;
}

function parsePreloadsJson(html: string): Record<string, unknown> | null {
  const match = html.match(/window\._preloads\s*=\s*JSON\.parse\("([\s\S]*?)"\)<\/script>/i);
  if (!match?.[1]) return null;

  try {
    const unescaped = match[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    const parsed = JSON.parse(unescaped) as Record<string, unknown>;
    return parsed;
  } catch {
    return null;
  }
}

async function getProfileIdFromHandle(handle: string): Promise<number | null> {
  try {
    const profileUrl = `https://substack.com/@${handle}`;
    const response = await fetch(profileUrl, {
      next: { revalidate: 1800 },
      headers: {
        "User-Agent": "fisioterapia-site/1.0",
        Accept: "text/html",
      },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const preloads = parsePreloadsJson(html);
    const profile = preloads?.profile as { id?: number } | undefined;

    if (!profile?.id || typeof profile.id !== "number") {
      return null;
    }

    return profile.id;
  } catch {
    return null;
  }
}

function toCanonicalUrl(post: ProfilePostPayload, publicationSubdomain?: string): string | null {
  if (post.canonical_url) return post.canonical_url;
  if (!post.slug) return null;
  if (publicationSubdomain) {
    return `https://${publicationSubdomain}.substack.com/p/${post.slug}`;
  }
  return null;
}

function toProfileFeedPost(item: ProfileFeedItem): SubstackPost | null {
  const attachmentWithPost = item.comment?.attachments?.find((attachment) => Boolean(attachment.post));
  const post = item.post ?? item.comment?.post ?? attachmentWithPost?.post;
  if (!post) return null;

  const title = post.title?.trim();
  const url = toCanonicalUrl(post, item.publication?.subdomain ?? attachmentWithPost?.publication?.subdomain);
  if (!title || !url) return null;

  const excerpt = (post.description ?? post.subtitle ?? post.truncated_body_text ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

  const id =
    typeof post.id === "number" || typeof post.id === "string"
      ? String(post.id)
      : item.entity_key ?? toPostId(url, title);

  return {
    id,
    title,
    url,
    publishedAt: post.post_date ?? item.context?.timestamp ?? item.comment?.date,
    excerpt: excerpt || "Leer este artículo en Substack.",
  };
}

async function getSubstackProfileFeedPosts(publicationUrl: string, limit: number): Promise<SubstackPost[]> {
  const handle = getSubstackHandle(publicationUrl);
  if (!handle) return [];

  const profileId = await getProfileIdFromHandle(handle);
  if (!profileId) return [];

  try {
    const endpoint = `https://substack.com/api/v1/reader/feed/profile/${profileId}`;
    const response = await fetch(endpoint, {
      next: { revalidate: 1800 },
      headers: {
        "User-Agent": "fisioterapia-site/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as ProfileFeedResponse;
    const items = payload.items ?? [];
    const mapped = items
      .map(toProfileFeedPost)
      .filter((post): post is SubstackPost => post !== null);

    return dedupePosts(mapped).slice(0, limit);
  } catch {
    return [];
  }
}

export function formatPublishedDate(value?: string): string | null {
  if (!value) return null;

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

export async function getSubstackPosts(limit = 6): Promise<SubstackFeedResult> {
  const publicationUrl = normalizePublicationUrl(process.env.NEXT_PUBLIC_SUBSTACK_URL) ?? FALLBACK_PUBLICATION;
  const configured = publicationUrl !== FALLBACK_PUBLICATION;

  if (!configured) {
    return { publicationUrl, configured, posts: [] };
  }

  const feedCandidates = getFeedCandidates(publicationUrl);
  let feedPosts: SubstackPost[] = [];

  for (const feedUrl of feedCandidates) {
    try {
      const response = await fetch(feedUrl, {
        next: { revalidate: 1800 },
        headers: {
          "User-Agent": "fisioterapia-site/1.0",
        },
      });

      if (!response.ok) {
        continue;
      }

      const xml = await response.text();
      const rssPosts = parseSubstackFeed(xml, limit);
      const atomPosts = rssPosts.length > 0 ? [] : parseSubstackAtomFeed(xml, limit);
      const posts = dedupePosts([...rssPosts, ...atomPosts]).slice(0, limit);

      if (posts.length > 0) {
        feedPosts = posts;
        break;
      }
    } catch {
      continue;
    }
  }

  const profileFeedPosts = await getSubstackProfileFeedPosts(publicationUrl, limit);
  const combinedPosts = dedupePosts([...profileFeedPosts, ...feedPosts]).slice(0, limit);

  if (combinedPosts.length > 0) {
    return { publicationUrl, configured, posts: combinedPosts };
  }

  return { publicationUrl, configured, posts: [] };
}
