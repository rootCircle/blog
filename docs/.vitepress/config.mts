import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog of Funky",
  description: "This site contain all my funky tech things, that I regret, but love doing.",
  base: "/blog/",
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/blog/icon.ico' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/archives/' },
      { text: 'Projects', link: '/project/' },
      { text: 'Start Guide', link: '/start_guide/' },
      { text: 'Notes', link: '/notes/' },
    ],

    sidebar: [
      {
        text: 'Blogs',
        items: [
          { text: 'MySQL Data Purging at Scale', link: '/archives/database/purging_mysql_tables_on_scale' },
          { text: 'It was not /dev/null', link: '/archives/misc/cost_of_not_initializing_variables' },
          { text: 'Linux Drama', link: '/archives/linux/linux_drama' },
          { text: 'React Init Optimization', link: '/archives/web/create-react-app-optimize' },
          { text: 'Embracing Bugs', link: '/archives/misc/buggy_code' },
          { text: 'Some Tweaks', link: '/archives/linux/tweaks' },
        ]
      },
      {
        text: 'Projects',
        items: [
          { text: 'cpast', link: '/project/cpast' },
          { text: 'cpast 10k special', link: '/project/cpast_10k' },
          { text: 'Ideas that won\'t make you millionaire', link: '/project/ideas_that_wont_make_millionaire' },
          { text: 'Summer Projects to pick', link: '/project/summer_projects' },
        ]
      },
      {
        text: 'Start Guide',
        items: [
          { text: 'Assembly 101', link: '/start_guide/assembly' }
        ]
      },
      {
        text: 'Notes',
        items: [
          { text: 'Distributed Systems', link: '/notes/distributed_systems' },
          { text: 'git', link: '/notes/git' },
          { text: 'Regex Notes', link: '/notes/regex' },
          { text: 'PDF Cracking', link: '/notes/pdfcrack' },
          { text: 'SpringBoot Notes', link: '/notes/springboot' },
          { text: 'Notes to self', link: '/notes/notes_to_self' },
          { text: 'HTML to React Initiative', link: '/notes/html2react' },
          { text: 'Nix', link: '/notes/nix' },
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
