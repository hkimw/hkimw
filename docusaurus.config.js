// @ts-check

module.exports = async function createConfig() {
  const {default: math} = await import('remark-math');
  const {default: katex} = await import('rehype-katex');

  return {
    title: 'hwkim-dev',
    tagline: 'Deep Learning · Parallel Programming · Systems Optimization',
    url: 'https://hwkim-dev.github.io',
    baseUrl: '/hwkim-dev/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
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
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'hwkim-dev',
        hideOnScroll: true,
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/blog/tags', label: 'Categories', position: 'left'},
          {to: '/papers', label: 'Papers', position: 'left'},
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: '/chatbot', label: 'Chatbot', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
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
        style: 'dark',
        links: [
          {
            title: 'Pages',
            items: [
              {label: 'Home', to: '/'},
              {label: 'Blog', to: '/blog'},
              {label: 'Categories', to: '/blog/tags'},
              {label: 'Papers', to: '/papers'},
              {label: 'Projects', to: '/projects'},
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
        copyright: `© ${new Date().getFullYear()} hwkim-dev. Built with Docusaurus.`,
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
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        rel: 'stylesheet',
      },
    ],
  };
};
