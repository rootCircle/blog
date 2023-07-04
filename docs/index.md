---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Blog of Funky"
  text: "This site contain all my funky tech things, that I regret, but love doing."
  tagline: All the Blogs😇
  actions:
    - theme: brand
      text: Threads
      link: /linux-blog/
    - theme: alt
      text: Notes
      link: /notes/springboot
---



<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/rootCircle.png',
    name: 'Lab Rat',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/rootCircle' }
    ]
  },
]
</script>

<VPTeamMembers size="small" :members="members" />