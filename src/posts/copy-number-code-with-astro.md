---
title: Copy code in Astro to clipboard
description: How to copy code in Astro to clipboard and, optionally, add line numbers.
abstract: How to copy code in Astro to clipboard and, optionally, add line numbers.
tags:
  - astro
  - javascript
datePublished: 2023-04-17
dateAdded: 2023-04-17
dateUpdated: 2023-04-17
url: null
image: null
draft: false
type: rpblog
---

This JavaScript was intended specifically for use with ASTRO, but with minimal effort the code could probably be modified to work with any Markdown-generated HTML. 

#### Copy Asto-displayed fenced code to the clipboard

The JavaScript below adds a link in the code block to copy it to the clipboard, as shown below: 

![collateral/copy-astro-code-to-clipboard.png](https://rogerpence.dev/collateral/copy-astro-code-to-clipboard.png)

Add the JavaScript below to your Astro project's client-side JavaScript. 

```js
const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str)
    return Promise.reject('The Clipboard API is not available.')
}

const preTags = document.querySelectorAll('pre')
let counter = 1 
preTags.forEach( (tag) => {    
    const codeId = `id-${counter++}`
    tag.setAttribute('data-code-id', codeId )
    const insertCodeButton = `
    <small class="copy-code-label">    
        <a data-code-id="${codeId}"
           title="Ctrl/Click to copy with line numbers" 
           class="copy-code-button" href=#>
           <i class="copy-icon fa-light fa-copy"></i> <span class="copy-text">copy</span>
        </a>
    </small>`
    tag.insertAdjacentHTML("beforebegin", insertCodeButton)    
});

const copyButtons = document.querySelectorAll('.copy-code-button')
copyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault()

        const codeId = e.currentTarget.getAttribute('data-code-id')
        const preTag = document.querySelector(`pre[data-code-id="${codeId}"]`)
        const codeTag = preTag.firstChild
        
        const faIconEl = button.querySelector('.copy-icon')
        const textEl = e.currentTarget.querySelector('span[class="copy-text"]')
        
        textEl.innerText = "copied"
        faIconEl.classList.remove('fa-light', 'fa-copy')
        faIconEl.classList.add('fa-solid','fa-thumbs-up')
        faIconEl.classList.add('fade-in')

        let source
        if (preTag.hasAttribute('data-source')) source = preTag.getAttribute('data-source') 
        else source = codeTag.innerText

        copyToClipboard(source) 

        setTimeout(() =>{
            textEl.innerText = "copy"
            faIconEl.classList.remove('fa-solid','fa-thumbs-up')
            faIconEl.classList.add('fa-light', 'fa-copy')
        }, 1000)

    })
})
```

Add these three CSS selectors to your Astro project's global CSS:

```css
.copy-code-label {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    position: relative;
}
.copy-code-label a {
    color: gray;        
    position: absolute;
    top: 16px;
    right: 10px;        
    text-decoration: none;
}

.copy-code-label a:after {
    content: '';
    height: 1px;
    background: gray; 
    display:block;
}
```

> This JavaScript uses FontAwesome icons.

#### Show line numbers in Asto-displayed fenced code 

Use the JavaScript to add line numbers to fenced code blocks in Astro. To assign line numbers to a fenced code block, add a `<div class="number-code below"></div> just above the markdown fence, leaving one blank line between the `div` tag and the fence (as shown below).

````markdown
<div class="number-code below"></div

```
    ... code to display here
```
````

Add the Javascript `addLineNumbers` function to the Astro app's client-side JavaScript.

```js
const addLineNumbers = () => {
    const snippetInstances = document.querySelectorAll('div.number-code-below + small +  pre > code')

    snippetInstances.forEach( (snippetInstance) => {
        //console.log(snippetInstance.parentElement.innerText)
        snippetInstance.parentElement.setAttribute('data-source', snippetInstance.parentElement.innerText)

        const lines = snippetInstance.querySelectorAll('span.line')

        let leadingSpacesCount = 2
        if (lines.length > 99) leadingSpacesCount = 3
        if (lines.length < 10) leadingSpacesCount = 1

        let counter = 1        
        lines.forEach( (line) => {
            const lineNo = counter.toString().padStart(leadingSpacesCount,' ')
            line.insertAdjacentHTML('afterbegin', `<span style="color: lightskyblue; border-right: 1px lightskyblue solid;padding-right: .2rem;margin-right: .5rem; ">${lineNo}</span>`)
            counter++
        })
    })
}
```

Call the addLineNumbers() function after the page loads. 

```js
addLineNumbers()
```
