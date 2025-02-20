import Courses from "@/components/home/Courses";
import FeatureCards from "@/components/home/FeaturesCard";
import HeroSection from "@/components/home/HeroSection";



export default function Home() {
  return (
  <main className="bg-primary/5">
    <HeroSection/>
    <FeatureCards/>
    <Courses/>
  </main>
  );
}
