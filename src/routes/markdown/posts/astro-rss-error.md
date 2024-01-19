---
title: "Fixing Astro's RSS Invalid or missing options error"
description: "How to fix Astro's RSS Invalid or missing options error when creating an RSS feed."
abstract: "How to fix Astro's RSS Invalid or missing options error when creating an RSS feed."
tags: [astro]
datePublished: 2023-04-19 
dateAdded: 2023-04-19
dateUpdated: 2023-04-19
url: 
image: 
draft: true
type: rpblog
---

[RSS] Invalid or missing options: Invalid input (items)
The RSS scheama

A minimal RSS feed must incls lude `title`, `description`, and `link` elements. It can optionally include a `pubDate` element and many other optional elements. See [the RSS spec](https://validator.w3.org/feed/docs/rss2.html#requiredChannelElements) for the full list of required and optional elements.

The Astro blog template provides this code to create an RSS feed for when building the Astro site for deployment. The blog template's default document schema includes the necessary `title`, `description`, and `link` fields as you can see in the code (from the project's `src/pages/rss.xml.js` file) below:

```
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
    const posts = await getCollection('blog');
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `/blog/${post.slug}/`,
        })),
    });
}

```

Note that because the blog template's default schema also includes a `pubDate` field, the spread value `...post.data` also ensures that the `pubDate` field is included in the fields for the RSS field in the code above. 

When you build an Astro blog template project, it successfully builds and creates the XML docs for the RSS feed successfully. 

What isn't made explicitly clear in the Astro docs is that the `@astrojs/rss/src/schema.ts` defines the RSS feed item's schema that the code above expects. That schema is shown below: 

```
import { z } from 'astro/zod';

export const rssSchema = z.object({
    title: z.string(),
    pubDate: z.union([z.string(), z.number(), z.date()]).transform((value) => new Date(value)),
    description: z.string().optional(),
    customData: z.string().optional(),
    draft: z.boolean().optional(),
});
```

Note that there are two required fields in this item schema schema: `title` and `pubDate`. The others are optional.

The fields provided for the item must include a `title` and `pubDate`


show Astro error here 

To fix the error, in the rss.xml.js file in your Astro project's `pages` folder, change the `get` function to this:

```
export async function get(context) {
    const posts = await getCollection('blog');
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.dateAdded,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
    });
}
```

Note how the `dateAdded` field is passed as `pubDate` to fulfill Astro's required RSS field item schema requirement.



