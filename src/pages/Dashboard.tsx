import Footer from "../components/widgets/Footer";
import Hero from "../components/widgets/Hero";
import Navbar from "../components/widgets/Navbar";
import Products from "../components/widgets/Products";
import PromoBlock from "../components/widgets/PromoBlock";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <Products />
      </div>
      <div>
        <PromoBlock />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
