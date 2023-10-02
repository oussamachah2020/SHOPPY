import { useEffect, useMemo, useState } from "react";
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
import ReturnBtn from "@/assets/return.png";

const Purchase = () => {
  const [quantity, setQuantity] = useState<number>(1);
  // const [totalPrice, setTotalPrice] = useState<number>(0);
  // const [productImage, setProductImage] = useState<number>(0);
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

  const totalPrice = useMemo(() => {
    return selectedProduct.price * quantity;
  }, [quantity]);

  return (
    <div className="w-full py-20 md:py-10 px-5 md:px-20 text-black">
      <h2 className="mb-10 text-xl md:text-3xl text-black flex justify-start gap-5 items-center cursor-pointer">
        <img
          src={ReturnBtn}
          alt="return button"
          onClick={() => navigate("/")}
        />
        Purchased Products
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between w-full mt-20 gap-10">
        <div className="flex flex-col justify-start items-start md:flex-row md:items-start align-super">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="w-[20rem] h-full"
          />
          <Box>
            {/* <div className="flex justify-center items-center">
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
            </div> */}
          </Box>
          <div className="mt-10 md:ml-10">
            <div>
              <h2 className="italic font-semibold text-lg">
                {selectedProduct.title}
              </h2>
              <div className="flex justify-strart items-start flex-col-reverse md:flex-col">
                <p className="w-[90%] mt-2">{selectedProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
        <form
          className=" flex flex-wrap gap-3 justify-start items-center w-[100%] md:w-[100%] p-5 shadow-lg h-[100%] rounded-md"
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
          <div>
            <h2 className="font-semibold text-2xl text-purple-800 mt-5">
              {/* <span className="text-black text-xl line-through mr-3">
                {} DHS{" "}
              </span> */}
              {totalPrice} DHS
            </h2>
          </div>
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
