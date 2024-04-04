import React from "react";
import Navbar from "../components/Navbar";
import Announcements from "../components/Announcements";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewLetter from "../components/NewLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewLetter/>
      <Footer />
    </div>
  );
};

export default Home;
