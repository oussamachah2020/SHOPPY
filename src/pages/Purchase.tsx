import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { PurchaseSchema } from "../types/validation.schemas";
import { PurchaseType } from "../types/types";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../store/productsStore";
import {
  ref as databaseRef,
  increment,
  push,
  set,
  update,
} from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const Purchase = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>();
  const { selectedProduct } = useProductsStore();
  const navigate = useNavigate();

  const handlePurchase = async () => {
    try {
      const dbRef = databaseRef(db, "purchase/");

      const updates = {
        ordersCounter: increment(1),
      };

      if (dbRef.key) {
        const newPurchaseRef = push(dbRef);

        set(newPurchaseRef, {
          orderId: uuidv4(),
          title: selectedProduct.title,
          category: selectedProduct.category,
          description: selectedProduct.description,
          imageURL: selectedProduct.imageURL,
          price: totalPrice,
          quantity: quantity,
          name: values.name,
          address: values.address,
          phone: values.phone,
          city: values.city,
          ordered_at: moment().calendar(),
        })
          .then(() => {
            update(dbRef, updates);
            toast.success("Product purchase successfully");
            navigate("/");
          })
          .catch((err) => console.error(err));
      }
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

  return (
    <div className="w-full py-20 md:py-10 px-2 md:px-24">
      <h2 className="mb-10 text-xl md:text-3xl text-black">
        Purchased Products
      </h2>
      <div className="shadow-xl md:p-10 rounded-lg flex flex-wrap justify-center md:flex-nowrap md:justify-between items-center relative">
        <img
          src={selectedProduct?.imageURL}
          alt={selectedProduct?.title}
          className="mr-10 w-[200px] md:w-[300px]"
        />
        <div className="flex flex-col-reverse justify-start items-center md:flex-row">
          <div className="card-body">
            <h2 className="card-title text-sm w-[100%] md:text-xl text-black">
              {selectedProduct?.title}
            </h2>
            <p className="text-black font-semibold w-[100%] md:w-[100%] text-sm md:text-xl leading-8 mt-5">
              {selectedProduct?.description}
            </p>
          </div>
          <div className="bg-white shadow-lg mr-10 p-10 rounded-xl w-[50%]">
            <h3 className="w-full text-black mb-5">
              To buy please enter your information
            </h3>
            <form
              className=" flex flex-wrap gap-3 justify-start items-start w-[100%]"
              onSubmit={handleSubmit}
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
              <button className="btn btn-primary w-[100%] ">Submit</button>
            </form>
            <div className="flex flex-nowrap justify-between items-end">
              <div className="mt-3 text-black">
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
              <p className="text-black text-md my-3">Total: {totalPrice}$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
