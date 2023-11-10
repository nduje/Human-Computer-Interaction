import HeadlineSection from "../components/home/HeadlineSection";
import ProductsSection from "../components/home/ProductsSection";
import CustomersSection from "../components/home/CustomersSection";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <HeadlineSection />
      <ProductsSection />
      <CustomersSection />
    </div>
  );
}
