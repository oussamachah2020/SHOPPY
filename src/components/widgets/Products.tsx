import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../../store/productsStore";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";

const Products = () => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setSelectedProduct } = useProductsStore();
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      setLoading(true);

      const dbRef = ref(db, "products/rwvOmZJhwdfdfDrvMNPE7BKqwEb2");
      const data = await get(dbRef);

      if (data.exists()) {
        setProductsData(Object.values(data.val()));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleProductSelection = (product: ProductType) => {
    setSelectedProduct(product);
    navigate("/purchases");
  };

  useEffect(() => {
    fetchProducts();
  }, []);
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
                  src={product.imageURL}
                  alt="Shoes"
                  className="w-[200px] h-[200px] object-contain"
                  loading="lazy"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-black">{product.title}</h2>
                <p className="text-black text-lg">{product.description}</p>
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
