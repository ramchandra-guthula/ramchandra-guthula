'use strict';

const siteData = window.siteData || { analytics: {}, articles: [] };
const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
const panels = Array.from(document.querySelectorAll('[data-page]'));

function formatLongDate(value) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}

function createArticleCard(article, variant) {
  const item = document.createElement('article');
  item.className = variant === 'teaser' ? 'article-teaser' : 'project-card';

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = article.category;

  const title = document.createElement(variant === 'teaser' ? 'h4' : 'h3');
  title.textContent = article.title;

  const description = document.createElement('p');
  description.textContent = article.description;

  const meta = document.createElement('p');
  meta.className = 'content-meta';
  meta.textContent = `${formatLongDate(article.date)} \u00B7 ${article.readTime}`;

  const link = document.createElement('a');
  link.href = article.url;
  link.textContent = variant === 'teaser' ? 'Read article' : 'Open article';

  item.append(badge, title, description, meta, link);
  return item;
}

function renderHomepageArticles() {
  const teaserGrid = document.querySelector('[data-article-grid="teasers"]');
  const contentGrid = document.querySelector('[data-article-grid="content"]');

  if (teaserGrid) {
    teaserGrid.replaceChildren(...siteData.articles.map((article) => createArticleCard(article, 'teaser')));
  }

  if (contentGrid) {
    contentGrid.replaceChildren(...siteData.articles.map((article) => createArticleCard(article, 'content')));
  }
}

function renderRelatedArticles() {
  const relatedList = document.querySelector('[data-related-articles]');
  const articleSlug = document.body.dataset.articleSlug;

  if (!relatedList || !articleSlug) {
    return;
  }

  const relatedArticles = siteData.articles.filter((article) => article.slug !== articleSlug).slice(0, 2);
  const links = relatedArticles.map((article) => {
    const link = document.createElement('a');
    link.href = article.url.replace('./articles/', './');
    link.textContent = article.title;
    return link;
  });

  const browseLink = document.createElement('a');
  browseLink.href = '../index.html#content';
  browseLink.textContent = 'Browse all homepage resources';

  relatedList.replaceChildren(...links, browseLink);
}

function enableAnalytics() {
  const { provider, plausibleDomain, goatcounterUrl, gaMeasurementId } = siteData.analytics || {};

  if (provider === 'plausible' && plausibleDomain) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = plausibleDomain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  }

  if (provider === 'goatcounter' && goatcounterUrl) {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.goatcounter = goatcounterUrl;
    script.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(script);
  }

  if (provider === 'ga4' && gaMeasurementId) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(gtagScript);

    const inlineScript = document.createElement('script');
    inlineScript.textContent = [
      'window.dataLayer = window.dataLayer || [];',
      'function gtag(){dataLayer.push(arguments);}',
      'gtag("js", new Date());',
      `gtag("config", "${gaMeasurementId}");`
    ].join('');
    document.head.appendChild(inlineScript);
  }
}

function showPage(pageName) {
  const normalized = pageName || 'about';
  const hasMatch = panels.some((panel) => panel.dataset.page === normalized);
  const activePage = hasMatch ? normalized : 'about';

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.page === activePage);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.navLink === activePage);
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const pageName = link.dataset.navLink;
    showPage(pageName);
    history.replaceState(null, '', `#${pageName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

window.addEventListener('hashchange', () => {
  const pageName = window.location.hash.replace('#', '');
  showPage(pageName);
});

renderHomepageArticles();
renderRelatedArticles();
enableAnalytics();
showPage(window.location.hash.replace('#', '') || 'about');

/* ==========================================================================
   Training series rendering: curriculum index, progress bar, prev/next nav.
   Appended for the SRE Training Series. Purely additive.
   ========================================================================== */

function getSeries(key) {
  return (siteData.series || {})[key] || null;
}

function renderSeriesIndex() {
  const host = document.querySelector('[data-series-index]');

  if (!host) {
    return;
  }

  const series = getSeries(host.dataset.seriesIndex);

  if (!series) {
    return;
  }

  const nodes = [];
  let currentModule = '';

  series.parts.forEach((part) => {
    if (part.level !== currentModule) {
      currentModule = part.level;
      const heading = document.createElement('p');
      heading.className = 'series-module-title';
      heading.textContent = currentModule;
      nodes.push(heading);
    }

    const link = document.createElement('a');
    link.href = part.url.replace('./articles/', './');

    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = String(part.n).padStart(2, '0');

    const copy = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = part.title;
    const description = document.createElement('p');
    description.textContent = part.description;
    const meta = document.createElement('p');
    meta.className = 'part-meta';
    meta.textContent = `${part.level} \u00B7 ${part.readTime}`;

    copy.append(title, description, meta);
    link.append(num, copy);
    nodes.push(link);
  });

  host.replaceChildren(...nodes);
}

function renderSeriesNav() {
  const host = document.querySelector('[data-series-nav]');
  const seriesKey = document.body.dataset.series;

  if (!host || !seriesKey) {
    return;
  }

  const series = getSeries(seriesKey);

  if (!series) {
    return;
  }

  const current = Number(document.body.dataset.seriesPart);
  const index = series.parts.findIndex((part) => part.n === current);
  const nodes = [];

  const makeLink = (part, direction) => {
    const link = document.createElement('a');
    link.className = direction;
    link.href = part.url.replace('./articles/', './');
    const label = document.createElement('span');
    label.textContent = direction === 'prev' ? 'Previous' : 'Next up';
    const title = document.createElement('strong');
    title.textContent = `${String(part.n).padStart(2, '0')}. ${part.title}`;
    link.append(label, title);
    return link;
  };

  if (index > 0) {
    nodes.push(makeLink(series.parts[index - 1], 'prev'));
  }

  if (index > -1 && index < series.parts.length - 1) {
    nodes.push(makeLink(series.parts[index + 1], 'next'));
  }

  const hub = document.createElement('a');
  hub.className = 'hub-link';
  hub.href = series.hubUrl.replace('./articles/', './');
  const hubLabel = document.createElement('span');
  hubLabel.textContent = 'Full curriculum';
  const hubTitle = document.createElement('strong');
  hubTitle.textContent = series.title;
  hub.append(hubLabel, hubTitle);
  nodes.push(hub);

  host.replaceChildren(...nodes);
}

function renderSeriesProgress() {
  const host = document.querySelector('[data-series-progress]');
  const seriesKey = document.body.dataset.series;

  if (!host || !seriesKey) {
    return;
  }

  const series = getSeries(seriesKey);

  if (!series) {
    return;
  }

  const current = Number(document.body.dataset.seriesPart);
  const total = series.parts.length;
  const percent = Math.round((current / total) * 100);

  const label = document.createElement('span');
  label.textContent = `Part ${current} of ${total}`;

  const track = document.createElement('span');
  track.className = 'progress-track';
  const fill = document.createElement('span');
  fill.className = 'progress-fill';
  fill.style.width = `${percent}%`;
  track.append(fill);

  host.replaceChildren(label, track);
}

renderSeriesIndex();
renderSeriesNav();
renderSeriesProgress();
