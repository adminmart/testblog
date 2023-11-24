import React from "react";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

export default async function Page({ params }) {
  const slug = params.slug;
  const postFilePath = join("blogsfiles", `/${slug}.md`);
  const fileContents = fs.readFileSync(postFilePath, "utf8");

  // const fileContents = () => fs.readFileSync(require.resolve(postFilePath), { encoding: "utf8" });

  const matterResult = matter(fileContents);

  return <div>My Post: {matterResult.data.title}</div>;
}
