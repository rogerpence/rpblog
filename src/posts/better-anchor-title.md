---
title: A better anchor title
description: A better anchor title
abstract: A better anchor title
tags:
  - html
  - css
datePublished: 2023-05-10
dateAdded: 2023-05-10
dateUpdated: 2023-05-14
url:
image: null
draft: true
type: rpblog
---

```
a {
  position: relative;
  display: inline-block;
  margin-top: 1rem; 
}

a[data-title]:hover::after {
  content: attr(data-title);
  position: absolute;
  background-color: black;
  color: white;
  top: -1.7rem;
  left: -2rem;
  padding: .1rem .4rem;
  border-radius: 5px;
}
```