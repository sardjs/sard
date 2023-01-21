export default {
  name: 'Sard',
  styles: ['assets/index.scss', 'src/components/index.scss'],
  publicDir: 'public',
  buildSite: {
    outDir: 'docs',
  },
  build: {
    entry: 'src/index.ts',
    cssEntry: 'src/style.ts',
    name: 'Sard',
    fileName: 'sard',
    outDir: 'dist',
  },
  alias: [
    {
      find: /^sard$/,
      replacement: '../../../index.ts',
    },
  ],
  site: {
    title: 'Sard',
    logo: 'logo.svg',
    seo: {
      title: 'Sard | React Component',
      description: 'Sard | React 移动端 UI 组件库',
    },
    routes: [
      {
        title: '首页',
        path: '/',
        filePath: 'markdown/home.md',
      },
      {
        title: '组件',
        path: '/components',
        index: 'button',
        children: [
          {
            type: 'group',
            title: '基础组件',
            items: [
              {
                title: 'Button 按钮',
                path: 'button',
                filePath: 'src/components/button',
              },
              {
                title: 'icon 图标',
                path: 'icon',
                filePath: 'src/components/icon',
              },
            ],
          },
          {
            type: 'group',
            title: '布局',
            items: [
              {
                title: 'grid 栅格',
                path: 'grid',
                filePath: 'src/components/grid',
              },
            ],
          },
        ],
      },
    ],
  },
}
