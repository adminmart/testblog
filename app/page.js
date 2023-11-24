import Head from "next/head";
import Navbar from "../components/Navbar/index";
import Banner from "../components/Banner/index";
import Footer from "../components/Footer/index";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

const Home = () => {
  const postsPath = "blogsfiles";
  const slug = "dynamic-routing-and-static-generation";
  const postFilePath = join(postsPath, `${slug}.md`);
  const fileContents = fs.readFileSync(postFilePath, "utf8");
  const matterResult = matter(fileContents);
  console.log("newsitem", matterResult.data.title);

  return <>{matterResult.data.title}</>;
};

export default Home;
