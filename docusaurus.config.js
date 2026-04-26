// @ts-check

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function collectBlogTags(dir) {
  const tagCount = {};
  try {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const {data} = matter(raw);
      for (const tag of data.tags ?? []) {
        tagCount[tag] = (tagCount[tag] ?? 0) + 1;
      }
    }
  } catch {}
  return Object.entries(tagCount)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, count]) => ({label, count}));
}

module.exports = async function createConfig() {
  const {default: math} = await import('remark-math');
  const {default: katex} = await import('rehype-katex');

  const baseUrl = '/hwkim-dev/';

  const blogCategoriesByLocale = {
    en: collectBlogTags(path.join(__dirname, 'blog')),
    ko: collectBlogTags(path.join(__dirname, 'i18n/ko/docusaurus-plugin-content-blog')),
  };

  return {
    title: 'hwkim-dev',
    tagline: 'Deep Learning · Parallel Programming · Systems Optimization',
    url: 'https://hwkim-dev.github.io',
    baseUrl,
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    markdown: {
      mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
    customFields: {
      blogCategories: blogCategoriesByLocale,
    },
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'ko'],
      localeConfigs: {
        en: {label: 'English', direction: 'ltr', htmlLang: 'en-US'},
        ko: {label: '한국어', direction: 'ltr', htmlLang: 'ko-KR'},
      },
    },
    presets: [
      [
        'classic',
        {
          docs: false,
          blog: {
            showReadingTime: true,
            blogTitle: 'Blog',
            blogDescription: 'Study notes, daily life, reviews, news, and random thoughts',
            postsPerPage: 10,
            blogSidebarTitle: 'Recent Posts',
            blogSidebarCount: 'ALL',
            remarkPlugins: [math],
            rehypePlugins: [katex],
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        },
      ],
    ],
    themeConfig: {
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'hwkim-dev',
        hideOnScroll: true,
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/papers', label: 'Papers', position: 'left'},
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: '/now', label: 'Now', position: 'left'},
          {to: '/chatbot', label: 'Chatbot', position: 'left'},
          {
            type: 'html',
            position: 'right',
            value: `<div class="navbar__item dropdown dropdown--right dropdown--hoverable lang-switch">
  <button class="navbar__link" aria-haspopup="true" aria-label="Language" type="button"><span class="lang-label-en">EN</span><span class="lang-label-ko">KR</span></button>
  <ul class="dropdown__menu">
    <li><a class="dropdown__link" href="${baseUrl}" data-noBrokenLinkCheck="true">English</a></li>
    <li><a class="dropdown__link" href="${baseUrl}ko/" data-noBrokenLinkCheck="true">한국어</a></li>
  </ul>
</div>`,
          },
          {
            href: 'https://github.com/hwkim-dev',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Pages',
            items: [
              {label: 'Home', to: '/'},
              {label: 'Blog', to: '/blog'},
              {label: 'Papers', to: '/papers'},
              {label: 'Projects', to: '/projects'},
              {label: 'Now', to: '/now'},
              {label: 'Chatbot', to: '/chatbot'},
            ],
          },
          {
            title: 'Connect',
            items: [
              {label: 'GitHub', href: 'https://github.com/hwkim-dev'},
              {label: 'Email', href: 'mailto:k1h6w4@gmail.com'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Hyunwoo Kim · Seoul. Built with Docusaurus.`,
      },
    },
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
        crossorigin: 'anonymous',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;500;600&display=swap',
        rel: 'stylesheet',
      },
    ],
  };
};
