---
title: Astro notes
description: Astro notes
abstract: Astro notes
tags:
  - astro
datePublished:  2023-04-16
dateAdded: 2023-04-16
dateUpdated: 2023-04-16
url: null
image: null
draft: true
type: rpblog
---

### Search a collection for a given set

```js
const findBlogEntries = await getCollection('blog', ({ data }) => {
  return data.title == 'Toast notifcations for .NET 6+ Windows apps'
})
```

### Get last four more recent posts

```
const top4 = posts
    .sort((a, b) => a.data.dateAdded.valueOf() - b.data.dateAdded.valueOf())
    //.slice(0,4)
    .map(function(item){ return {"title": item.data.title, 
                                 "date" :item.data.dateAdded,
                                 "tags" : item.data.tags,
                                 "abstract" : item.data.abstract}})
```   

### Get posts with glob

```
  const allPosts = await Astro.glob('../../posts/*.md');
```


### dynamic urls 

First page is blah -- the /1 is assumed 

```
[...page].astro
```

First page is blah/1 -- the /1 needs to be explicit

```
[page].astro
```


### `c#` tag causes error on `npm run build`

Should `#` in tags (or anywhere else, really) be converted to the entity for `#` which is `&#35;`

### Embedding an Astro property into an HTML value attribute

Use a JavaScript template literal as shown below. 

```html
href={`tags/${tag.name}`}
```
If `tag.name` is `astro`, the result is:

```html
href="tags/astro"
```

Astro implicitly adds the double quotes around the template literal. 
 