import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import toast from "react-hot-toast";
// import {
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
// } from "firebase/firestore";
// import useAuthStore from "../../store/authStore";
import { ProductType } from "../../types/types";
// import { productsStore } from "../../store/productsStore";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../../store/productsStore";

const Products = () => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setSelectedProduct } = useProductsStore();
  const navigate = useNavigate();

  async function fetchProducts() {
    setLoading(true);

    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setProductsData(json);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductSelection = (product: ProductType) => {
    setSelectedProduct(product);
    navigate("/purchases");
  };

  return (
    <div className="py-24 md:p-24">
      <h2 className="mb-10 text-3xl text-black">Products</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {loading ? (
          <div className="flex justify-center items-center w-44">
            <CircularProgress />
          </div>
        ) : (
          productsData.map((product) => (
            <div
              key={product.id}
              className="card h-[100%]  shadow-xl pt-2 bg-white"
            >
              <figure>
                <img
                  src={product.image}
                  alt="Shoes"
                  className="w-full h-[200px] object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-black">{product.title}</h2>
                <div className="card-actions flex justify-center items-center relative top-5">
                  <p className="text-black text-xl">{product.price}$</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleProductSelection(product)}
                  >
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
