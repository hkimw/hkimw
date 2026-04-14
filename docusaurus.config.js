// @ts-check

const config = {
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
};

module.exports = config;
