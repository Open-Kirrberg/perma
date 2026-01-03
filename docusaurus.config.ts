import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';

const isProd = process.env.NODE_ENV === 'production';

const config: Config = {
  title: 'Permakultur Kirrberg',
  tagline: 'Natur im Gleichgewicht: Permakultur für alle',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://open-kirrberg.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: isProd ? '/perma/' : '/', // lokaler Modus vs. Produktion

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Open-Kirrberg', // Usually your GitHub org/user name.
  projectName: 'perma', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      {
        // docs: {
        //   sidebarPath: './sidebars.ts',
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Permakultur Kirrberg',
      items: [
        {
          to: '/areas/intro',
          label: 'Flächen',
          position: 'left',
          activeBaseRegex: `/areas/`,
        },
        {
          to: '/wiki/intro',
          label: 'Wiki',
          position: 'left',
          activeBaseRegex: `/wiki/`,
        },
        {
          to: '/klimakarte',
          label: 'KlimaKarte',
          position: 'left'
        },
        {
          to: '/map',
          label: 'Map',
          position: 'left'
        },
        {
          to: '/baumschule',
          label: 'Baumschule',
          position: 'left'
        },
        {
          to: '/events',
          label: 'Events',
          position: 'left'
        },
        {
          to: '/vision',
          label: 'Vision',
          position: 'left'
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {
          href: 'https://github.com/Open-Kirrberg/perma',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Entdecken',
          items: [
            {
              label: 'Flächen',
              to: '/areas/intro',
            },
            {
              label: 'Wiki',
              to: '/wiki/intro',
            },
            {
              label: 'Karte',
              to: '/map',
            },
          ],
        },
        {
          title: 'Ressourcen',
          items: [
            {
              label: 'Baumschule',
              to: '/baumschule',
            },
            {
              label: 'Events',
              to: '/events',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Mehr',
          items: [
            {
              label: 'Vision',
              to: '/vision',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Open-Kirrberg/perma',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Open-Kirrberg e.V. - Permakultur Kirrberg`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
    plugins: [
      [
        'content-docs',
        {
          id: 'areas',
          path: 'areas',
          routeBasePath: 'areas',
          sidebarPath: './sidebarsAreas.ts',
        } satisfies DocsOptions,
      ],
      [
        'content-docs',
        {
          id: 'wiki',
          path: 'wiki',
          routeBasePath: 'wiki',
          sidebarPath: './sidebarsWiki.ts',
        } satisfies DocsOptions,
      ],
      [
        'content-docs',
        {
          id: 'baumschule',
          path: 'baumschule',
          routeBasePath: 'baumschule',
          sidebarPath: './sidebarsBaumschule.ts',
        } satisfies DocsOptions,
      ],
    ],
};

export default config;
