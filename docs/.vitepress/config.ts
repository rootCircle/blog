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
      { text: 'Blog', link: '/archives/' },
      { text: 'Projects', link: '/project/' },
      { text: 'Start Guide', link: '/start-guide/' },
      { text: 'Notes', link: '/notes/' },
    ],

    sidebar: [
      {
        text: 'Blogs',
        items: [
          { text: 'Linux Drama', link: '/archives/linux/linux_drama'},
          { text: 'Some Tweaks', link: '/archives/linux/tweaks'},
          { text: 'Nix', link: '/archives/linux/nix'},
          { text: 'React Init Optimization', link: '/archives/web/create-react-app-optimize'}
        ]
      },
      {
        text: 'Projects',
        items: [
          { text: 'cpast', link: '/project/cpast'},
          { text: 'Ideas that won\'t make you millionaire', link: '/project/ideas-that-wont-make-millionaire'}
        ]
      },
      {
        text: 'Start Guide',
        items: [
          { text: 'Assembly 101', link: '/start-guide/assembly' }
        ]
      },
      {
        text: 'Notes',
        items: [
          { text: 'git', link: '/notes/git'},
          { text: 'Regex Notes', link: '/notes/regex'},
          { text: 'SpringBoot Notes', link: '/notes/springboot'},
          { text: 'HTML to React Initiative', link: '/notes/html2react'},
          { text: 'PDF Cracking', link: '/notes/pdfcrack'}
        ]
      },
    ],
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rootCircle/blog' }
    ],
    search: {
      provider: 'local'
    }
  }
})
