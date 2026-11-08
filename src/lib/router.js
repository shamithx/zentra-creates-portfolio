/* ============================================================
   Minimal hash router — no dependency.
   Routes:  #/               → portfolio home
            #/project/<slug> → project case study
   Plain in-page anchors (#work, #contact …) keep working: they
   resolve to the home route and scroll normally.
   ============================================================ */
import { useEffect, useState } from 'react';

const PROJECT_PREFIX = '#/project/';

function parse() {
  const hash = window.location.hash || '';
  if (hash.startsWith(PROJECT_PREFIX)) {
    return { name: 'project', slug: decodeURIComponent(hash.slice(PROJECT_PREFIX.length)) };
  }
  return { name: 'home', slug: null, anchor: hash.startsWith('#/') ? '' : hash.replace('#', '') };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (route.name === 'project') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [route.name, route.slug]);

  return route;
}

export function goToProject(slug) {
  window.location.hash = `#/project/${slug}`;
}

export function goHome(anchor = '') {
  window.location.hash = anchor ? `#${anchor}` : '#/';
}
