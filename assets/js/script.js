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
  meta.textContent = `${formatLongDate(article.date)} • ${article.readTime}`;

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
