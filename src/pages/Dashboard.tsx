import { useEffect } from "react";
import Footer from "../components/widgets/Footer";
import Hero from "../components/widgets/Hero";
import Navbar from "../components/widgets/Navbar";
import Products from "../components/widgets/Products";
import PromoBlock from "../components/widgets/PromoBlock";
import { auth } from "../firebase";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(
      (user: firebase.User | null) => {
        setUser(user);
      }
    );

    return () => {
      subscription(); // Call the unsubscribe function to clean up the subscription
    };
  }, [auth]);

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
