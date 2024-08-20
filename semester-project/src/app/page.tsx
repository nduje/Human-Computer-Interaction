import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import ReviewSection from "../components/home/ReviewSection";
import BlogsSection from "../components/home/BlogsSection";
import FeaturedSection from "../components/home/FeaturedSection";


export default function Home() {
  return (
    <div className="m-0 p-0">
      <HeroSection />
      <CategoriesSection />
      <ReviewSection />
      <FeaturedSection />
      <BlogsSection />
    </div>
  );
}
