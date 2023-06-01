import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog of Funky",
  description: "This site contain all my funky tech things, that I regret, but love doing.",
  base: "/blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Threads', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Topics',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Regex Notes', link: '/regex'},
          { text: 'Linux Drama', link: '/linux-blog/'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rootCircle/blog' }
    ]
  }
})
