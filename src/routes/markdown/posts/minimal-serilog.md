---
title: Minimal Serilog
description: Dapper repository
abstract: Astro notes
tags:
  - astro
datePublished:  2023-04-16
dateAdded: 2023-04-16
dateUpdated: 2023-04-16
url: null
image: null
draft: false
type: rpblog
---


Serilog is a rich and deep logging package. Its capabilities are well beyond what .NET's basic `ILogger` offers. However, with its power comes lots of knobs and switches.

This article provides the minimal amount of code need to log to a text file with Serilog. This example is essentially doing the same thing that the basic `ILogger` features do. However, with Serilog in place, you can then fiddle with Serilog's knobs and switches to put its more sophisticated features to work.

##### Step 1. Install Nuget packages:

*   Serilog
*   Serilog.Sinks.File

##### Step 2. Add using statement:

    using Serilog;

##### Step 3. Configure Serilog:

    Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.Console()
        .WriteTo.File("logs/Mylog.log", rollingInterval: RollingInterval.Day)
        .CreateLogger();

#### Step 4. Create a log entry:

    Log.Information("Serilog is working!");