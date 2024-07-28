---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Blog of Funky
description: Find about my blogs, start guides, notes and projects in one place!
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:image
      content: https://www.github.com/rootCircle.png
  - - meta
    - name: twitter:card
      content: summary_large_image
hero:
  name: "Blog of Funky"
  tagline: Expect bugs here and there.
  actions:
    - theme: brand
      text: Blogs
      link: /archives/
    - theme: alt
      text: Academic Notes
      link: https://rootcircle.is-a.dev/acads/
---



<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/rootCircle.png',
    name: 'rootCircle',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/rootCircle' }
    ]
  },
]
</script>

<VPTeamMembers size="small" :members="members" />
