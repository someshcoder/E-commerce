import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Products from "./Products";
import TopDeals from "../components/TopDeals";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TopDeals />
      <section className="bg-gray-50 py-10">
        <Products />
      </section>
      <Categories />
      <Newsletter />
      <Features />
    </>
  );
};

export default Home;
