import BottomBanner from "../sections/Home/BottomBanner";
import { FaqSection } from "../sections/Home/FaqSection";
import FeaturesSection from "../sections/Home/FeaturesSection";
import HeroSection from "../sections/Home/HeroSection";
import Pricing from "../sections/Home/Pricing";
import Testimonials from "../sections/Home/Testimonials";
import TrustedCompanies from "../sections/Home/TrustedCompanies";

export default function Home() {
    return (
        <>
            <HeroSection />
            <TrustedCompanies />
            <FeaturesSection />
            <Testimonials />
            <Pricing />
            <FaqSection />
            <BottomBanner />
        </>
    );
}