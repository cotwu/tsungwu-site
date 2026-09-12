---
title: "Rebuilding this site in a day: notes from the APEX workshop"
description: On 12 September 2026 I attended the APEX workshop on personal branding in the AI era. The core of an online presence should come from professional accumulation, not traffic, and writing turns out to be nothing more than recording one's own thinking.
date: 2026-09-12
---

# Rebuilding this site in a day: notes from the APEX workshop

Today I attended [APEX](https://apex.innovarad.tw/), a one-day workshop on personal branding in the AI era run by Innovarad in Taipei. These notes were written the same evening, and they double as the record of how this site was rebuilt from scratch in a single day.

## Arriving with a site that already existed

I was not starting entirely from zero. The domain tsungwu.tw has been mine since February, with a single-page business-card site on it. Only while preparing for the workshop did I notice that its content was filled in by a script after the page loaded, so the raw HTML that Google and the AI crawlers read was empty in every section. But the real problem was not technical: all I had wanted was a business card. The idea of a personal brand had never crossed my mind. A digital Flintstone, more or less.

That happens to be the point the workshop kept returning to: in the AI era a site is not only for people to look at; it has to be readable, and quotable, by search engines and language models. So the goal for the day was clear: not to patch, but to rebuild.

## What happened during the day

Environment setup followed the workshop's own flow. Once the tools were installed and GitHub and Cloudflare were connected, almost everything else was done by talking. I backed the old site up three ways (a tag on GitHub, the source and a live mirror in Dropbox), then told Claude Code: forget the old one, build a new one.

Every page of the new site is generated as complete HTML at build time; nothing depends on browser-side scripts. English and Traditional Chinese each have their own copy, cross-referenced page by page. About twenty seconds after a push to GitHub, Cloudflare has the new version live. That speed makes "change a word, look, change again" a workable way to work.

## The most important thing from the morning

The first half of the day covered a fair amount of SEO and GEO basics: how to structure a site, how search engines and AI read a page, which settings are table stakes. Useful, but not what I took away.

The most important sentence was this: **the core of an online personal brand should come from the accumulation of your professional work, not from traffic.**

I had some resistance to the idea of "writing articles continuously." It sounded like a second job, writing for exposure about things I might not want to say. Listening to the instructor turned that around: it is simply recording one's own thinking. Every day in clinical work there are judgements being made; every day in research there is literature being read and gaps being noticed. That thinking is already happening; it just is not written down, and so it dissipates.

Writing it down accumulates a record of one's professional reasoning. And that process is, in itself, a footprint left in the world. Not for the sake of how many people see it, but so that the ideas existed, can be found, and can be built on. In a digital world these small accumulations are gradually recognised.

Seen that way, writing is no longer an extra burden. It is part of what was already being done, with one added step: recording it.
