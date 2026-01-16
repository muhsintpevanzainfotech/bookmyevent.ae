import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import ScrollToTop from "./ScrollToTop";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <ScrollToTop /> 
      <Outlet />
      <Footer />

      <ScrollToTopButton />
    </>
  );
}
