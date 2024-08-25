import LoginForm from "../components/home/LoginSection";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedSection from "../components/home/FeaturedSection";
import ReviewSection from "../components/home/ReviewSection";
import BlogsSection from "../components/home/BlogsSection";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <LoginForm />
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <ReviewSection />
      <BlogsSection />
    </div>
  );
}
