import LoginForm from "../components/home/LoginSection";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedSection from "../components/home/FeaturedSection";
import ReviewSection from "../components/home/ReviewSection";
import BlogsSection from "../../src/app/blogs/BlogsSection";
import BlitzNewsSection from "../components/home/BlitzNewsSection";

export default function Home() {
  return (
    <div className="font-roboto w-full h-full m-0 p-0 overflow-x-hidden">
      <HeroSection />
      <CategoriesSection />
      <hr className="border-1 md:border-2 rounded-full border-base-colors-200/30 md:border-base-colors-200/10 w-[90vw] m-auto"></hr>
      <FeaturedSection />
      <hr className="border-1 md:border-2 rounded-full border-base-colors-200/30 md:border-base-colors-200/10 w-[90vw] m-auto"></hr>
      <ReviewSection />
      <hr className="border-1 md:border-2 rounded-full border-base-colors-200/30 md:border-base-colors-200/10 w-[90vw] m-auto"></hr>
      <BlogsSection />
      {/* <BlitzNewsSection /> */}
    </div>
  );
}
