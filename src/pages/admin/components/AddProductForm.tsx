import { Box, IconButton, Typography } from "@mui/material";
import {
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ref as databaseRef, push, set } from "firebase/database";
import { useFormik } from "formik";
import { db, storage } from "../../../firebase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { adminProduct } from "../../../types/types";
import { v4 as uuidv4 } from "uuid";
import { Subscribe } from "@firebase/util";
import { Unsubscribe } from "firebase/auth";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddProductForm({
  userId,
  closeModal,
}: {
  userId: string | undefined;
  closeModal: () => void;
}) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages([...selectedImages, ...e.target.files]);
    }
  };

  const onSubmit = async () => {};

  const { values, handleChange, handleSubmit } = useFormik<adminProduct>({
    initialValues: {
      title: "",
      description: "",
      category: "",
      imageURL: [],
      price: "",
      pieces: "",
      coupon: 0,
    },
    onSubmit,
  });

  const addProduct = async () => {
    setIsLoading(true);

    const dbRef = databaseRef(db, "/products/" + userId);

    if (dbRef.key === userId) {
      const newProductRef = push(dbRef);
      set(newProductRef, { ...values, id: uuidv4() })
        .then(() => {
          toast.success("Products Added Successfully");
          closeModal();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  function cancelUpload() {
    setSelectedImages([]);
    setProgress(0);
  }

  useEffect(() => {
    if (selectedImages.length === 0) {
      return;
    }

    let unsubscribe: Unsubscribe | Subscribe<UploadTaskSnapshot>;

    selectedImages.forEach((image) => {
      if (image.size > 1024 * 1024) {
        toast.error("Image is too large");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
        toast.error(
          "Invalid image type. Only JPEG and PNG formats are allowed."
        );
        return;
      }
      const imageRef = ref(storage, `productsImages/${image.name}`);

      const uploadTask = uploadBytesResumable(imageRef, image);

      unsubscribe = uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressValue);
          if (progressValue !== 100) {
            toast.loading("Uploading...");
          } else {
            toast.dismiss();
            toast.success("Upload completed successfully!");
          }
        },
        (error) => {
          console.error("Error uploading the file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            values.imageURL.push(downloadURL);
          });
        }
      );
    });

    return () => {
      unsubscribe();
    };
  }, [selectedImages, values.imageURL]);

  return (
    <Box sx={style}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 5,
          }}
        >
          <span className="loading loading-dots loading-lg bg-primary"></span>
          <Typography
            sx={{
              color: "#000",
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            Uploading Product
          </Typography>
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#000", textAlign: "center", fontSize: 18 }}>
          Add Product
        </Typography>
        <IconButton sx={{ color: "red" }} onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <form onSubmit={handleSubmit} className=" mt-2">
          {activeStep === 0 ? (
            <div className="w-[110%]">
              <div className="form-group">
                <label className="label">
                  <span className="label-text text-[#000000a6] text-md font-medium">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full bg-white text-black"
                />
              </div>

              <div className="form-group">
                <label className="label">
                  <span className="label-text text-[#000000a6] text-md font-medium mt-3">
                    Description
                  </span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="textarea textarea-primary w-full bg-white text-black"
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="label">
                  <span className="label-text text-[#000000a6] text-md font-medium mt-3">
                    Category
                  </span>
                </label>

                <select
                  className="select select-primary w-full bg-white text-black"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <option selected>Select Category</option>
                  <option>Women</option>
                  <option>Men</option>
                  <option>Kids</option>
                </select>
              </div>
              <div className="form-group w-full">
                <label className="label w-full relative">
                  <span className="label-text text-[#000000a6] text-md font-medium mt-3">
                    {selectedImages.length !== 0 && progress > 0 ? (
                      <div className="flex flex-row justify-around items-center w-full">
                        <p>Uploading</p>
                        <button
                          className=" text-red-500 absolute right-0"
                          onClick={cancelUpload}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      "Product Image"
                    )}
                  </span>
                </label>
                {selectedImages.length !== 0 && progress > 0 ? (
                  <progress
                    className="progress progress-primary w-full"
                    value={progress}
                    max={100}
                  ></progress>
                ) : (
                  <input
                    onChange={handleFileChange}
                    multiple
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full  bg-white"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="w-[110%]">
              <div className="form-group mt-3">
                <label className="label">
                  <span className="label-text text-[#000000a6] text-md font-medium">
                    Number of Pieces
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Number of Pieces"
                  id="pieces"
                  name="pieces"
                  value={values.pieces}
                  onChange={handleChange}
                  className="input input-bordered input-primary w-full bg-white text-black"
                />
              </div>

              <div className="form-control w-full mt-3">
                <label className="label">
                  <span className="label-text text-[#000000a6] text-md font-medium ">
                    Product Price
                  </span>
                </label>
                <label className="input-group">
                  <input
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    type="text"
                    placeholder="Prix"
                    className="input input-bordered input-primary bg-white text-black w-full"
                  />
                  <span className="bg-purple-600 text-white">DHS</span>
                </label>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-[#000000a6] text-md font-medium ">
                    add coupon (optional)
                  </span>
                </label>
                <label className="input-group">
                  <input
                    id="coupon"
                    name="coupon"
                    value={values.coupon}
                    onChange={handleChange}
                    type="number"
                    placeholder="example: 30"
                    className="input input-bordered input-primary bg-white text-black w-full"
                  />
                  <span className="bg-purple-600 text-white">%</span>
                </label>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center gap-10">
            <button
              type="submit"
              className="btn btn-outline w-[50%] mt-8 text-black"
              disabled={activeStep == 0}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary w-[50%] mt-8 text-white"
              onClick={activeStep === 0 ? handleNext : addProduct}
            >
              {activeStep === 0 ? "next" : "add"}
            </button>
          </div>
        </form>
      </Box>
    </Box>
  );
}

export default AddProductForm;
