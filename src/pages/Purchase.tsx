import { useEffect, useState } from "react";
import { productsStore } from "../store/productsStore";
import { useFormik } from "formik";
import { PurchaseSchema } from "../types/validation.schemas";
import { PurchaseType } from "../types/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>();
  const { selectedProduct } = productsStore();
  const navigate = useNavigate();

  const handlePurchase = async () => {
    try {
      await addDoc(collection(db, "purchase"), {
        userData: values,
        product: { ...selectedProduct, quantity: quantity },
      }).then(() => {
        toast.success("Product purchase successfully");
        navigate("/");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const { values, handleChange, handleSubmit, errors } =
    useFormik<PurchaseType>({
      initialValues: {
        name: "",
        phone: "",
        address: "",
        city: "",
      },
      validationSchema: PurchaseSchema,
      onSubmit: () => {
        handlePurchase();
      },
    });

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (selectedProduct?.price) {
      const totalPrice = Math.floor(selectedProduct.price * quantity);
      setTotalPrice(totalPrice);
    }
  }, [quantity, selectedProduct?.price]);

  const fullStars = Math.floor(selectedProduct?.rating.rate || 0);

  // Determine if there is a half star (between 0.25 and 0.75)
  const hasHalfStar = selectedProduct?.rating.rate
    ? selectedProduct?.rating.rate - fullStars >= 0.25 &&
      selectedProduct?.rating.rate - fullStars <= 0.75
    : 0;

  // Determine the number of empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="w-full py-24 md:p-24 ">
      <h2 className="mb-10 text-3xl text-black">Purchased Products</h2>
      <div className="shadow-xl p-10 rounded-lg flex flex-wrap md:flex-nowrap justify-between items-start relative">
        <img
          src={selectedProduct?.image}
          alt={selectedProduct?.title}
          className="mr-10 md:w-[300px] "
        />
        <div className="card-body">
          <h2 className="card-title text-black">{selectedProduct?.title}</h2>
          <p className="text-black font-semibold w-[80%] leading-8 mt-5">
            {selectedProduct?.description}
          </p>
          <div>
            <div className="rating mt-2">
              {[...Array(fullStars)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                />
              ))}
              {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
              {[...Array(emptyStars)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked
                />
              ))}
            </div>
          </div>

          <div className="mt-3 text-black md:absolute bottom-10">
            <p>Choose Quantity</p>
            <div className="w-24 flex flex-nowrap flex-1 items-center mt-5">
              <button className="btn btn-square" onClick={increaseQuantity}>
                +
              </button>
              <p className="text-center px-2 text-xl">{quantity}</p>
              <button
                className="btn btn-square"
                onClick={decreaseQuantity}
                disabled={quantity == 0}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg mr-10 p-10 rounded-xl w-[120%]">
          <h3 className="w-full text-black mb-5">
            To buy please enter your information
          </h3>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-wrap gap-3 justify-start items-center w-[100%]"
          >
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="input input-bordered input-primary w-full bg-white"
            />
            {errors && <p className="text-red-500">{errors.name}</p>}
            <input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone Number +212"
              className="input input-bordered input-primary w-full bg-white"
            />
            {errors && <p className="text-red-500">{errors.phone}</p>}

            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              type="text"
              placeholder="Enter your city"
              className="input input-bordered input-primary w-full bg-white"
            />
            {errors && <p className="text-red-500">{errors.city}</p>}

            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="input input-bordered input-primary w-full bg-white"
            />
            {errors && <p className="text-red-500">{errors.address}</p>}
            <p className="text-black text-md my-3">Total: {totalPrice}$</p>
            <button className="btn btn-primary w-[100%] ">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
