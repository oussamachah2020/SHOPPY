import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ProductType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../../store/productsStore";
import { get, ref } from "firebase/database";
import { db } from "../../firebase";

const Products = () => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const { setSelectedProduct } = useProductsStore();
  const navigate = useNavigate();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

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

  const filteredProducts = useMemo(() => {
    if (category) {
      return productsData.filter((item) => item.category.includes(category));
    } else {
      return productsData;
    }
  }, [category, productsData]);

  return (
    <div className="py-24 px-5 md:p-24">
      <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center md:justify-between items-center">
        <h2 className="text-2xl text-center text-black">
          Best Selling Products
        </h2>
        <div className="flex flex-row justify-center items-center gap-2 mt-5">
          <p>Category: </p>
          <select
            className="select select-primary w-full bg-white text-black"
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option selected value="">
              Select Category
            </option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-center md:grid-cols-4 md:gap-4">
        {loading ? (
          <div className="flex justify-center items-center w-44">
            <CircularProgress />
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card card-compact w-96 bg-white shadow-xl cursor-pointer"
              onClick={() => handleProductSelection(product)}
            >
              {product.showReductionBadge === true ? (
                <div className="triangle-topleft">
                  <p className="absolute top-5 left-2 -rotate-45 text-white text-xl">
                    -{product.percentage}%
                  </p>
                </div>
              ) : null}
              <figure>
                <img
                  src={product.imageURL[0]}
                  alt="Shoes"
                  className="h-[250px] w-full object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="h-fit">{product.description}</p>
                <div className="card-actions  justify-between items-center">
                  {product.reducedPrice ? (
                    <div>
                      <p className="text-black text-lg line-through">
                        {product.price} DHS
                      </p>
                      <p className="text-purple-700 text-2xl font-semibold">
                        {product.reducedPrice} DHS
                      </p>
                    </div>
                  ) : (
                    <p className="text-black text-xl">{product.price} DHS</p>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleProductSelection(product)}
                  >
                    Buy Now
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
