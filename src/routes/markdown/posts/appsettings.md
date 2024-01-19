---
title: Using an appsettings.json file with a C# console app
description: Using an `appsettings.json` file with a C# console app
abstract: How to use 'appsettings.json' in a C# console app
tags:
  - cs
datePublished: 2022-06-22
dateAdded: 2022-06-22
dateUpdated: 2022-06-22
url: null
image: null
draft: false
type: rpblog
---
 
To add an `appsettings.json` file to a C# console app:

**Step 1.** Add the "Microsoft.Extensions.Configuration.Json" package to the project.

Adding this package also pulls in the "Microsoft.Extensions.Configuration.Abstractions" and "Microsoft.Extensions.Primitives" packages (as of June 2022).

**Step 2.** Add a `appsettings.json` file to the root of the project.

**Step 3.** Right-click the `appsettings.json` file to show its Properties window. Then set its "Copy to Output Directory" property to "Copy always." This ensures the `appsettings.json` file is copied to the Debug or Release folder every time the project is built.

![AppSettings with Json](https://rogerpence.dev/wp-content/uploads/2022/06/appsettings.json-copy-always-1.png)

Figure 1. Set "Copy to Output Directory" property

**Step 4.** Add values to the `appsettings.json` file. The example below shows a couple of connection strings defined in the `appsettings.json` file.

```json
{
    "ConnectionString": {
        "SqlServer": "Data Source=.;Initial Catalog=Crm;Integrated Security=True",
        "Sqlite": "Data Source=C:\\Users\\thumb\\Documents\\db\\ProjectDiaryDB.db"
    }
}

```

**Step 5.** Add this `using` statement to your project:

```c#
using Microsoft.Extensions.Configuration;
```

**Step 6.** Add this bootstrap code to instance an `IConfiguration` object:

```c#
var builder = new ConfigurationBuilder();
builder.SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

IConfiguration config = builder.Build();
```

You can park this code away in a secondary class or use it inline. The resulting `config` object can then passed around to provide access to configuration values.

**Step 7.** Fetch values from the `appsettings.json` file:

```c#
string connectionString = config["ConnectionString:SqlServer"];
```

or

```c#
string connectionString = config.GetSection("ConnectionString").GetSection("SqlServer").Value;
```

Surprisingly, the keys to the values in the `appsettings.json` file are not case-sensitive with either technique above. However, it seems prudent to me to treat them as such.

### Configuration flexibility

Using an `appsettings.json` file with the `IConfiguration` object offers lots of flexibility. For example, the configuration below:

*   Reads values from `appsettings.json` first
*   Then if it is present, reads any values from `appsettings.dev.json`, overwriting, or adding to, values read from `appsettings.json`
*   Then, attempt to read values from environmental settings. These also overwrite or add to, the setting values previously established with the first two steps.

```c#
builder.SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        .AddJsonFile("appsettings.dev.json", optional: true, reloadOnChange: true)
        .AddEnvironmentVariables();
```        