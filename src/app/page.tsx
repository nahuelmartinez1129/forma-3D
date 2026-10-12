import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomizationSection } from "@/components/home/CustomizationSection";
import { Faq } from "@/components/home/Faq";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PortfolioBand } from "@/components/home/PortfolioBand";
import { PrintingProcess } from "@/components/home/PrintingProcess";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <PrintingProcess />
      <CustomizationSection />
      <HowItWorks />
      <Faq />
      <PortfolioBand />
    </>
  );
}
