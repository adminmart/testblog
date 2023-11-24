import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

const Home = () => {
  const postsPath = "blogsfiles";
  const slug = "dynamic-routing-and-static-generation";
  const postFilePath = join(postsPath, `${slug}.md`);
  const fileContents = fs.readFileSync(postFilePath, "utf8");
  const matterResult = matter(fileContents);
  console.log("newsitem", matterResult.data.title);

  return (
    <>
      <Link href={`/blogs/${matterResult.data.slug}`}>
        {matterResult.data.title}
      </Link>
      {matterResult.data.title}
    </>
  );
};

export default Home;
