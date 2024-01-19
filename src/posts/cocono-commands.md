---
title: Using Cocona commands
description: Lorem ipsum dolor sit amet
abstract: How to use 'appsettings.json' in a C# console app
tags:
  - cocona
datePublished: 2022-07-15
dateAdded: 2022-07-15
dateUpdated: 2022-07-15
url: null
image: null
draft: false
type: rpblog
---

Install Cocona with Nuget.

Here is a bare-bones Cocona scaffold:

<div class="number-code-below"></div>

```c#
using Cocona;

var builder = CoconaApp.CreateBuilder();
var app = builder.Build();

app.AddCommand("Hello", () =>
{
    Console.WriteLine("Hello");
});

app.Run();
```

Command line to run the `Hello` command:

<div class="number-code-below"></div>

```c#
appname Hello
```
Here is a way to specify Cocona command arguments:

<div class="number-code-below"></div>

```c#
app.AddCommand("showInfo", ([Option('n')]string name, 
                            [Option('a')]int age, 
                            [Option('e')]bool exempt) => {
});
```

Command line to run the `showInfo` command:

<div class="number-code-below"></div>

```c#
appname showInfo --n Neil --a 74 ---e 
```

or 

<div class="number-code-below"></div>

```c#
appname showInfo -name Neil -age 74 -exempt 
```

The presence of a Boolean option is true, otherwise it is false.

