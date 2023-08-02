import { Box, Typography } from "@mui/material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useFormik } from "formik";
import { db } from "../../../firebase";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

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

function AddProductForm({ userId }: { userId: string | undefined }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);

    const storage = getStorage();

    // Check if a file is selected
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    // Create a reference to 'productsImages/<filename>'
    const imageRef = ref(storage, `productsImages/${selectedFile.name}`);

    // Upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(imageRef, selectedFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can use this callback to track the progress of the upload if needed.
        // For example, you can calculate the percentage of completion.
        const progressValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
        setProgress(progressValue);
      },
      (error) => {
        console.error("Error uploading the file:", error);
      },
      () => {
        // Upload completed successfully. You can now get the download URL.
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Save the downloadURL to the 'values' object or wherever you need it.
          values.imageURL = downloadURL;
          console.log(downloadURL);
          toast.success("Image Uploaded successfully");
        });
      }
    );
  };

  const onSubmit = async () => {};

  const { values, handleChange, handleSubmit } = useFormik<{
    title: string;
    description: string;
    category: string;
    imageURL: string;
    price: string;
    ownerId: string | undefined;
  }>({
    initialValues: {
      title: "",
      description: "",
      category: "",
      imageURL: "",
      price: "",
      ownerId: userId,
    },
    onSubmit,
  });

  const addProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        product: values,
      }).then(() => {
        toast.success("Product added successfully");
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  function cancelUpload() {
    setSelectedFile(null);
    setProgress(0);
  }

  return (
    <Box sx={style}>
      <Typography sx={{ color: "#000", textAlign: "center", fontSize: 18 }}>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit} className="w-[100%] mt-5">
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
            <option disabled selected>
              Category
            </option>
            <option>Women</option>
            <option>Men</option>
            <option>Kids</option>
          </select>
        </div>
        <div className="form-group w-full">
          <label className="label w-full relative">
            <span className="label-text text-[#000000a6] text-md font-medium mt-3">
              {selectedFile != null && progress > 0 ? (
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
          {selectedFile !== null && progress > 0 ? (
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max={100}
            ></progress>
          ) : (
            <input
              onChange={handleFileChange}
              type="file"
              className="file-input file-input-bordered file-input-primary w-full  bg-white"
            />
          )}
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
        <button
          type="submit"
          className="btn btn-primary w-full mt-5"
          onClick={addProduct}
        >
          ADD
        </button>
      </form>
    </Box>
  );
}

export default AddProductForm;
