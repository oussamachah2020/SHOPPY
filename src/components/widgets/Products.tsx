import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface ProductType {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const Products = () => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
                <h2 className="card-title text-white">{product.title}</h2>
                <p className="text-black font-semibold">
                  <br />
                  {showMore
                    ? product.description
                    : `${product.description?.substring(0, 250)}`}
                  <button
                    className="link"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {" "}
                    {showMore ? "Show less" : "Show more"}
                  </button>
                </p>
                <div className="card-actions flex justify-between items-center relative top-5">
                  <p>{product.price}$</p>
                  <button className="btn btn-primary">Buy Now</button>
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
