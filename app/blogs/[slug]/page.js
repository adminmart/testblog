import React from "react";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

export default function Page({ params }) {
  const slugname = params.slug;
  const postsPath = "blogsfiles";
  const postFilePath = join(postsPath, `${slugname}.md`);
  const fileContents = fs.readFileSync(postFilePath, "utf8");

  // const fileContents = () => fs.readFileSync(require.resolve(postFilePath), { encoding: "utf8" });

  const matterResult = matter(fileContents);
  console.log("newsitem", matterResult);

  return <div>My Post: {matterResult.data.title}</div>;
}
