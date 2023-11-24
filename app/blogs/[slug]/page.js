import React from "react";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

const BlogPost = ({ params }) => {
  const slugname = params.slug;
  console.log(params);
  const postsPath = "blogsfiles";
  const postFilePath = join("blogsfiles", `/${slugname}.md`);
  const fileContents = fs.readFileSync(postFilePath, "utf8");

  // const fileContents = () => fs.readFileSync(require.resolve(postFilePath), { encoding: "utf8" });

  const matterResult = matter(fileContents);

  return <div>My Post: {matterResult.data.title}</div>;
};

export default BlogPost;
