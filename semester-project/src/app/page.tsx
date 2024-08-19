import ReviewSection from "../components/home/ReviewSection";
import CategoriesSection from "../components/home/CategoriesSection";
import BlogsSection from "../components/home/BlogsSection";


export default function Home() {
  return (
    <div className="m-0 p-0">
      <CategoriesSection />
      <ReviewSection />
      <BlogsSection />
    </div>
  );
}
