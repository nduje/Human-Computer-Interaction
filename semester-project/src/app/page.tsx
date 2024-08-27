import LoginForm from "../components/home/LoginSection";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedSection from "../components/home/FeaturedSection";
import ReviewSection from "../components/home/ReviewSection";
import BlogsSection from "../components/home/blogs/BlogsSection";

export default function Home() {
  return (
    <div className="w-full m-0 p-0 overflow-x-hidden">
      <LoginForm />
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <ReviewSection />
      <BlogsSection />
    </div>
  );
}
