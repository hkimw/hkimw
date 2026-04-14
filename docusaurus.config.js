// @ts-check

const config = {
  title: 'hwkim-dev',
  tagline: '딥러닝 · 병렬 프로그래밍 · 시스템 최적화',
  url: 'https://hwkim-dev.github.io',
  baseUrl: '/hwkim-dev/',
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
        docs: false,
        blog: {
          showReadingTime: true,
          blogTitle: '블로그',
          blogDescription: '공부, 일상, 리뷰, 뉴스, 잡도리를 기록하는 공간',
          postsPerPage: 10,
          blogSidebarTitle: '최근 글',
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
          title: '네비게이션',
          items: [
            {label: '홈', to: '/'},
            {label: '블로그', to: '/blog'},
            {label: '논문', to: '/papers'},
            {label: '프로젝트', to: '/projects'},
            {label: '챗봇', to: '/chatbot'},
          ],
        },
        {
          title: '블로그 카테고리',
          items: [
            {label: '📚 공부', to: '/blog/tags/공부'},
            {label: '💬 잡도리', to: '/blog/tags/잡도리'},
            {label: '🌱 일상', to: '/blog/tags/일상'},
            {label: '⭐ 리뷰', to: '/blog/tags/리뷰'},
            {label: '📰 뉴스', to: '/blog/tags/뉴스'},
          ],
        },
        {
          title: '소셜 & 연락처',
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
