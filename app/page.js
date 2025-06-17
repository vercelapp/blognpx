import Sidebar from "@/components/Sidebar";
import SectionHeader from "@/components/essential/SectionHeader";
import Banner from "@/components/home-3/Banner";
import Header from "@/components/home-3/Header";
import LayoutThree from "@/components/home-3/Layout";
import PostFour from "@/components/posts/Post-4";
import PostBlack from "@/components/posts/PostBlack";
import homepageData from "@/data/pages/_index-3.json";
import allPosts from "@/data/posts.json";
import { popularCategories } from "@/libs/functions/categories";
import { isPostInArray } from "@/utils/isPostInArray";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import Link from "next/link";

const Home = async () => {
  // homepage data
  const {
    headerCategories,
    banner,
    popularArticles,
    sidebar,
    exploreTopics,
    latestArticles,
  } = homepageData.frontmatter || {};

  // All Categories
  const categories = popularCategories(allPosts) || [];

  // First featured post
  const [featuredPost] =
    allPosts.filter((post) => post.frontmatter.featured) || [];

  // Top posts
  const topPosts =
    allPosts
      .filter(
        (post) => post.frontmatter.trending && post.slug !== featuredPost.slug
      )
      .slice(0, 4) || [];

  // Latest posts
  const latestPosts = allPosts.slice(0, 9) || [];

  // Popular posts
  const popularPosts =
    allPosts
      .filter(
        (post) =>
          !isPostInArray(post, topPosts) &&
          post.slug !== featuredPost.slug &&
          post.frontmatter.trending &&
          post.frontmatter.featured
      )
      .slice(0, 6) || [];

  return (
    <LayoutThree>
      <Header hasCategory={headerCategories.enable} categories={categories} />
      <Banner banner={banner} featuredPost={featuredPost} topPosts={topPosts} />

     {/* Latest Articles */}
      {latestArticles?.enable && (
        <section className="py-16 sm:py-24 bg-secondary">
          <div className="container">
            <div className="border-t pt-8 border-[#DBD8BD]">
              <div className="flex justify-between items-center sm:items-start">
                <h2 className="text-base uppercase font-secondary pl-4 relative after:absolute after:rounded-full -mt-1 after:content-[''] after:h-2 after:w-2 after:bg-primary after:left-0 after:top-2 text-white">
                  {latestArticles.title}
                </h2>

                <Link
                  className="button group animate-top-right button-light"
                  href={latestArticles.button.link}
                >
                  <span className="relative overflow-hidden transition-none [&>span]:block">
                    <span className="group-hover:-translate-y-[200%] group-hover:scale-y-[2] group-hover:rotate-12">
                      <span className="hidden sm:inline">
                        {latestArticles.button.label}
                      </span>
                      <span className="inline sm:hidden">All</span>
                    </span>
                    <span className="absolute left-0 top-0 scale-y-[2] rotate-12 translate-y-[200%] group-hover:translate-y-0 group-hover:scale-y-100 group-hover:rotate-0">
                      <span className="hidden sm:inline">
                        {latestArticles.button.label}
                      </span>
                      <span className="inline sm:hidden">All</span>
                    </span>
                  </span>
                  <span className="overflow-hidden leading-none -translate-y-[2px]">
                    {/* prettier-ignore */}
                    <svg className="inline-block animate-icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.00005L9 1.00005M9 1.00005H1.8M9 1.00005V8.20005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="container mt-10">
            <div className="row gy-6">
              {latestPosts.map((post, index) => (
                <div key={index} className="md:col-6 lg:col-4">
                  <PostBlack post={post} color="secondary" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Latest Articles */}
    </LayoutThree>
  );
};

export default Home;
