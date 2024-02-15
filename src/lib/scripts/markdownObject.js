// @ts-nocheck 

import fs from "fs";
import yaml from "js-yaml";

const parseMardkdownFile = (filename) => {
  const frontMatter = [];
  const content = [];

  let frontMatterDelimiterCount = 0;

  const allFileContents = fs.readFileSync(filename, "utf-8");

  allFileContents.split(/\r?\n/).forEach((line) => {
    if (line.match(/^---\s*$/)) frontMatterDelimiterCount++;

    if (frontMatterDelimiterCount <= 1) {
      frontMatter.push(line);
    } else {
      content.push(line);
    }
  });

  return {
    frontMatter,
    content,
  };
};

export const getMarkdownObject = (filename) => {
  try {
    const { frontMatter, content } = parseMardkdownFile(filename);

    const fm = yaml.load(frontMatter.join("\n"));

    const results = {
      frontmatter: fm,
      content: content.join("\n"),
    };

    return results;
  } catch (error) {
    if (error.code == "ENOENT") {
      console.log(
        `** ERROR ** File not found in parseMardkdownFile: ${filename}`
      );
    } else {
      console.log(`** ERROR ** Error in parseMardkdownFile`);
      console.error(error);
    }
  }
};

const results = getMarkdownObject("./tesd.md");

console.log(results);
