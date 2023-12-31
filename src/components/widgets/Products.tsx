import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ProductType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../../store/productsStore";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  // const { T } = useT();
  const { t } = useTranslation();

  const { setSelectedProduct } = useProductsStore();
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      setLoading(true);

      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          setProductsData(json);
        })
        .finally(() => {
          setLoading(false);
        });
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
    <div className="py-24 px-5 " id="products">
      <div className="flex flex-wrap md:flex-nowrap gap-2 justify-center md:justify-between items-center">
        <div className="flex justify-start gap-20 items-center flex-row">
          <h2 className="w-full text-[18px] md:text-2xl text-center text-black">
            Produits les plus vendus
          </h2>

          {[...new Set(productsData.map((product) => product.category))].map(
            (product) => (
              <div className="md:flex justify-center items-center flex-row hidden">
                <button
                  key={product}
                  value={product}
                  className={`border-2 border-[#7779e4] w-[10rem]  rounded-full ${
                    category === product ? "bg-[#7779e4] text-white" : ""
                  }`}
                  onClick={() => setCategory(product)}
                >
                  {product}
                </button>
              </div>
            )
          )}
          <select className="select select-primary bg-transparent text-black  flex md:hidden">
            {[...new Set(productsData.map((product) => product.category))].map(
              (product) => (
                <option
                  key={product}
                  value={product}
                  className={`border-2 border-[#7779e4] px-5 h-12 rounded-full ${
                    category === product ? "bg-[#7779e4] text-white" : ""
                  }`}
                  onClick={() => setCategory(product)}
                >
                  {product}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-center md:grid-cols-4 md:gap-8 md:pl-0 gap-4 mt-20">
        {loading ? (
          <div className="flex justify-center items-center w-44">
            <CircularProgress />
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card card-compact w-[100%] bg-white shadow-xl cursor-pointer"
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
                  src={product.image}
                  alt="Shoes"
                  className="h-[250px] w-full object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{t(product.title)}</h2>
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
