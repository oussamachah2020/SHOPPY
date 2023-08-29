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
import { Box } from "@mui/material";

const Purchase = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productImage, setProductImage] = useState<number>(0);
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
          seen: false,
          delivered: false,
          ordered_at: moment().format(),
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
    <div className="w-full py-20 md:py-10 px-5 md:px-24 text-black">
      <h2 className="mb-10 text-xl md:text-3xl text-black">
        Purchased Products
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between w-full">
        <div className="flex flex-col justify-start items-start md:flex-row md:items-center ">
          <Box>
            <img
              src={selectedProduct.imageURL[productImage]}
              alt={selectedProduct.title}
              className="md:w-[350px]"
            />
            <div className="flex justify-center items-center">
              {selectedProduct.imageURL.map(
                (images: string | undefined, index: number) => (
                  <button
                    key={index}
                    className={`${
                      productImage === index ? "border-2 border-gray-500" : ""
                    }  mr-5 mt-10 border border-gray-400`}
                    onClick={() => setProductImage(index)}
                  >
                    <img className="w-[80px] p-1" src={images} alt="image" />
                  </button>
                )
              )}
            </div>
          </Box>
          <div className="mt-10 md:ml-10">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <h2 className="italic font-semibold text-lg">
                {selectedProduct.title}
              </h2>
              <h2 className="font-semibold text-lg text-purple-800">
                {totalPrice} DHS
              </h2>
            </Box>
            <p>{selectedProduct.description}</p>
          </div>
        </div>
        <form
          className=" flex flex-wrap gap-3 justify-start items-center w-[100%] md:w-[40%] p-5 shadow-lg h-[100%] rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="visible border border-gray-200 mt-3 md:hidden"></div>
          <h3 className="w-full text-black text-md my-3">
            To buy, enter your personal information.
          </h3>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "93%",
              mt: 3,
            }}
          >
            <button type="submit" className="btn btn-primary min-w-[60%]">
              Buy Now
            </button>
            <div className=" text-black">
              <div className="w-24 flex flex-nowrap items-center ">
                <button className="btn btn-square" onClick={increaseQuantity}>
                  +
                </button>
                <p className="text-center px-2 text-xl">{quantity}</p>
                <button
                  className="btn btn-square"
                  onClick={decreaseQuantity}
                  disabled={quantity == 1}
                >
                  -
                </button>
              </div>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
