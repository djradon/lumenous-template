---
title: Documentation
description: How to make this site your own
order: 5
oldUrl: 
  - /documentation/
  - /documentation/first-section/
---

## What is lumenous-template?

This template repo is a content-free and slightly de-branded version of the beautiful and functional [Lume](https://lume.land/) site. 

## Responsibility

If you use this template, especially in a commercial capacity, please [sponsor](https://github.com/sponsors/oscarotero) or otherwise compensate the original creator, [Óscar Otero](https://oscarotero.com/). 

## Usage Instructions

### Re-branding

You're going to want some SVG code. Try https://www.svgviewer.dev if you don't already have something.

- replace /src/site/favicon.svg with your own
- in /src/site/navbar.vto replace the "<!-- Central Decorative Element -->" <svg> with your own.
- in /static, replace avatar.png and logo.png
  - if you change the filenames, make sure to update the metas info in /_data.yml


### Re-configuration

- in /src/_config.ts:
  - set your URL instead of `location: new URL("https://djradon.github.io/lumenous-template"),`
    - or remove the line altogether if your site isn't published under a subdirectory
    - see [the lume docs](https://lume.land/docs/configuration/config-file/#location) for more details
- update other metadata values in /_data.yml
- replace the <svg> in _includes/templates/navbar.vto

## Changes from @lumeland/lume.land


### Themes -> Fetch

I wanted to generify the "Themes" area, so renamed some files from `theme*` to `fetch`. But a lot of the internal references still say `theme`. Confusing.

### CMS -> Documentation

- I find it potentially confusing to use "docs" as a directory name for any purpose other than to hold the generated site for auto-hosting via "classic" github pages. 

### Docsearch/Algolia -> Pagefind

- Unlike the original site, lumenous-template uses Pagefind for search functionality
- If you want to exclude a page from the index, use `noIndex: true` in the .yml or frontmatter
  - see 404.yml or documentation/third-section/x.md for examples

### Removals

Aside from removing almost all of lume-specific text (hopefully) and almost all of the existing graphics, I removed:

- the "[Showcase](https://lume.land/showcase/)" section because it seemed like a static version "Themes" (now "Fetch").
-  

