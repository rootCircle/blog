---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Blog of Funky"
  tagline: Expect bugs here and there.
  actions:
    - theme: brand
      text: Blogs
      link: /archives/
    - theme: alt
      text: Projects
      link: /project/
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