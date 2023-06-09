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
      { text: 'Threads', link: '/linux-blog/' }
    ],

    sidebar: [
      {
        text: 'Topics',
        items: [
          { text: 'Linux Drama', link: '/linux-blog/'},
          { text: 'Some Tweaks', link: '/linux-blog/tweaks'},
          { text: 'React Init Optimization', link: '/web-dev/create-react-app-optimize'}
        ]
      },
      {
        text: 'Notes',
        items: [
          { text: 'Regex Notes', link: '/notes/regex'},
          { text: 'SpringBoot Notes', link: '/notes/springboot'},
          { text: 'HTML to React Initiative', link: '/notes/html2react'},
          { text: 'git', link: '/notes/git'},
        ]
      }
    ],
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rootCircle/blog' }
    ],
    search: {
      provider: 'local'
    }
  }
})
