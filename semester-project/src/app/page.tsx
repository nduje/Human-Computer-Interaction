import HeadlineSection from "../components/home/HeadlineSection";
import StatsSection from "../components/home/StatsSection";
import ProductsSection from "../components/home/ProductsSection";


export default function Home() {
  return (
    <div className="m-0 p-0">
      <HeadlineSection />
      <StatsSection />
      {/* <ProductsSection /> */}
      {/* <NewsletterSection /> */}
    </div>
  );
}
