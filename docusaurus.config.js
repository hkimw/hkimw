// @ts-check

const config = {
  title: 'hwkim-dev',
  tagline: '개인 기술 블로그 & 포트폴리오',
  url: 'https://hwkim-dev.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'hwkim-dev',
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/docs/papers', label: 'Papers', position: 'left'},
        {to: '/docs/projects', label: 'Projects/Repos', position: 'left'},
        {to: '/docs/chatbot', label: 'Chatbot', position: 'left'},
      ],
    },
  },
};

module.exports = config;
