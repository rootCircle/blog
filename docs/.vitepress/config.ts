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
      { text: 'Threads', link: '/regex' }
    ],

    sidebar: [
      {
        text: 'Topics',
        items: [
          { text: 'Regex Notes', link: '/regex'},
          { text: 'Linux Drama', link: '/linux-blog/'},
          { text: 'React Init Optimization', link: '/web-dev/create-react-app-optimize'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rootCircle/blog' }
    ]
  }
})
