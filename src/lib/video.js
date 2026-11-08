/* ============================================================
   Social video links → official embeds
   ------------------------------------------------------------
   Paste a YouTube / Vimeo / TikTok / Instagram URL anywhere a
   project accepts a video. This module works out:
     • the platform
     • the video id
     • the platform's own embed URL (never a raw <video src>)
     • the aspect ratio the frame should use
       16:9 for YouTube and Vimeo, 9:16 for TikTok and Reels.

   Instagram and TikTok apply their own restrictions on the
   platform side, so a link can still refuse to play — the player
   component always offers an "open the original" fallback.
   ============================================================ */

export const PLATFORMS = {
  youtube: { label: 'YouTube', ratio: '16 / 9', vertical: false },
  vimeo: { label: 'Vimeo', ratio: '16 / 9', vertical: false },
  tiktok: { label: 'TikTok', ratio: '9 / 16', vertical: true },
  instagram: { label: 'Instagram', ratio: '9 / 16', vertical: true },
  facebook: { label: 'Facebook', ratio: '16 / 9', vertical: false },
};

const YT_HOSTS = ['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'youtu.be'];
const TT_HOSTS = ['tiktok.com', 'm.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'];
const FB_HOSTS = ['facebook.com', 'm.facebook.com', 'web.facebook.com', 'fb.com', 'fb.watch'];

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  };
};

const youtubeId = (url, path, params) => {
  if (hostOf(url) === 'youtu.be') return path.split('/')[1] || '';
  const v = params.get('v');
  if (v) return v;
  const m = path.match(/\/(?:shorts|embed|live|v)\/([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : '';
};

/**
 * @param {string} raw — the pasted social media link
 * @returns {{ok:boolean, platform:string|null, id:string, embedUrl:string,
 *            ratio:string|null, original:string, reason:string}}
 */
export function parseVideoUrl(raw) {
  const original = (raw || '').trim();
  const fail = (reason, platform = null, ratio = null) => ({
    ok: false,
    platform,
    id: '',
    embedUrl: '',
    ratio,
    original,
    reason,
  });

  if (!original) return fail('empty');

  let url;
  try {
    url = new URL(original);
  } catch {
    return fail('invalid');
  }
  if (!/^https?:$/.test(url.protocol)) return fail('invalid');

  const host = hostOf(original);
  const path = url.pathname;
  const params = url.searchParams;

  /* ——— YouTube ——— */
  if (YT_HOSTS.includes(host)) {
    const id = youtubeId(original, path, params);
    if (/^[A-Za-z0-9_-]{6,}$/.test(id)) {
      return {
        ok: true,
        platform: 'youtube',
        id,
        ratio: PLATFORMS.youtube.ratio,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
        original,
        reason: '',
      };
    }
    return fail('no-id', 'youtube', PLATFORMS.youtube.ratio);
  }

  /* ——— Vimeo ——— */
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const m = path.match(/(?:video\/)?(\d{6,})/);
    if (m) {
      const h = params.get('h');
      return {
        ok: true,
        platform: 'vimeo',
        id: m[1],
        ratio: PLATFORMS.vimeo.ratio,
        embedUrl: `https://player.vimeo.com/video/${m[1]}?byline=0&portrait=0${h ? `&h=${h}` : ''}`,
        original,
        reason: '',
      };
    }
    return fail('no-id', 'vimeo', PLATFORMS.vimeo.ratio);
  }

  /* ——— TikTok ——— */
  if (TT_HOSTS.includes(host)) {
    const m = path.match(/\/video\/(\d{6,})/) || path.match(/\/embed\/v2\/(\d{6,})/);
    if (m) {
      return {
        ok: true,
        platform: 'tiktok',
        id: m[1],
        ratio: PLATFORMS.tiktok.ratio,
        embedUrl: `https://www.tiktok.com/embed/v2/${m[1]}`,
        original,
        reason: '',
      };
    }
    const short = host.startsWith('vm.') || host.startsWith('vt.');
    return fail(short ? 'short-link' : 'no-id', 'tiktok', PLATFORMS.tiktok.ratio);
  }

  /* ——— Instagram ——— */
  if (host === 'instagram.com' || host === 'instagr.am') {
    const m = path.match(/\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
    if (m) {
      const kind = m[1] === 'reels' ? 'reel' : m[1];
      const vertical = kind === 'reel' || kind === 'tv';
      return {
        ok: true,
        platform: 'instagram',
        id: m[2],
        ratio: vertical ? PLATFORMS.instagram.ratio : '4 / 5',
        embedUrl: `https://www.instagram.com/${kind}/${m[2]}/embed`,
        original,
        reason: '',
      };
    }
    return fail('no-id', 'instagram', PLATFORMS.instagram.ratio);
  }

  /* ——— Facebook (official video plugin) ——— */
  if (FB_HOSTS.includes(host)) {
    const reel = path.match(/\/reel\/(\d{6,})/);
    if (reel) {
      const canonical = `https://www.facebook.com/reel/${reel[1]}`;
      return {
        ok: true,
        platform: 'facebook',
        id: reel[1],
        ratio: PLATFORMS.instagram.ratio, /* reels are vertical */
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonical)}&show_text=false&width=560`,
        original: canonical,
        reason: '',
      };
    }

    const vid =
      path.match(/\/videos\/(?:[^/]+\/)?(\d{6,})/) ||
      path.match(/\/video\.php$/) && null;
    const watchId = params.get('v');
    const id = (vid && vid[1]) || (watchId && /^\d{6,}$/.test(watchId) ? watchId : '');

    if (id) {
      /* Keep the page slug when there is one — Facebook resolves either form. */
      const canonical = path.includes('/videos/')
        ? `https://www.facebook.com${path.replace(/\/$/, '')}`
        : `https://www.facebook.com/watch/?v=${id}`;
      return {
        ok: true,
        platform: 'facebook',
        id,
        ratio: PLATFORMS.facebook.ratio,
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonical)}&show_text=false&width=560`,
        original: canonical,
        reason: '',
      };
    }

    const short = host === 'fb.watch' || /\/share\/[rv]\//.test(path);
    return fail(short ? 'short-link' : 'no-id', 'facebook', PLATFORMS.facebook.ratio);
  }

  return fail('unsupported');
}

/** Human explanation for a link that cannot be embedded. */
export function explainFailure(reason, platform) {
  const name = platform ? PLATFORMS[platform]?.label : null;
  switch (reason) {
    case 'empty':
      return 'No video link was added to this project yet.';
    case 'invalid':
      return 'That does not look like a web address. Paste the full link, including https://';
    case 'unsupported':
      return 'This platform is not supported yet. Supported: YouTube, Vimeo, TikTok and Instagram.';
    case 'short-link':
      if (platform === 'facebook') {
        return 'Facebook share links (share/r/… , fb.watch/…) cannot be embedded. Open the reel, tap the ⋯ menu, choose Copy link, and paste the facebook.com/reel/… address instead.';
      }
      return `Short ${name || 'TikTok'} links (vm.tiktok.com) have to be opened on ${name || 'TikTok'} first — open the video, then copy the full link from the address bar.`;
    case 'no-id':
      return `A ${name || 'video'} id could not be read from that link. Open the video on ${name || 'the platform'} and copy the full address from the browser.`;
    default:
      return 'This video could not be embedded.';
  }
}
