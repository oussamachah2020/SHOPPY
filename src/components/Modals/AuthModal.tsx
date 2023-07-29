// import React from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { AuthSignUpSchema } from "../../types/validation.schemas";
import { signInType, signUpType } from "../../types/types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

type LoginModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

function SignIn({ handleClose }: { handleClose: () => void }) {
  const onSubmit = async () => {};

  const { values, errors, handleChange, handleSubmit } = useFormik<signInType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: AuthSignUpSchema,
    onSubmit,
  });

  const signIn = () => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        handleClose();
        return userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  console.log(values);
  return (
    <div className="mt-16">
      <Dialog.Title className="text-black text-center text-xl">
        Sign In
      </Dialog.Title>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="E-mail"
            id="email"
            name="email"
            className={`input ${
              errors ? "border-red-500" : "border-[#0000003d]"
            } w-full bg-white text-black`}
            value={values.email}
            onChange={handleChange}
          />
          {errors && (
            <label className="label">
              <span className="label-text text-red-500">{errors.email}</span>
            </label>
          )}
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            className={`input ${
              errors ? "border-red-500" : "border-[#0000003d]"
            } w-full bg-white text-black`}
            value={values.password}
            onChange={handleChange}
          />
          {errors && (
            <label className="label">
              <span className="label-text text-red-500">{errors.password}</span>
            </label>
          )}
        </div>
        <button
          onClick={signIn}
          type="submit"
          className="btn btn-primary mt-5 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

function SignUp({ handleClose }: { handleClose: () => void }) {
  const auth = getAuth();
  const onSubmit = () => {};

  const { values, errors, handleChange } = useFormik<signUpType>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: AuthSignUpSchema,
    onSubmit,
  });

  const signUp = () => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((authUser) => {
        handleClose();
        return authUser.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div className="mt-16">
      <Dialog.Title className="text-black text-center text-xl">
        Sign Up
      </Dialog.Title>
      <div className="form-control mt-5">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          className={`input ${
            errors ? "border-red-500" : "border-[#0000003d]"
          } w-full bg-white text-black`}
          value={values.username}
          onChange={handleChange}
        />
        {errors && (
          <label className="label">
            <span className="label-text text-red-500">{errors.username}</span>
          </label>
        )}
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="E-mail"
          id="email"
          name="email"
          className={`input ${
            errors ? "border-red-500" : "border-[#0000003d]"
          } w-full bg-white text-black`}
          value={values.email}
          onChange={handleChange}
        />
        {errors && (
          <label className="label">
            <span className="label-text text-red-500">{errors.email}</span>
          </label>
        )}
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          id="password"
          name="password"
          className={`input ${
            errors ? "border-red-500" : "border-[#0000003d]"
          } w-full bg-white text-black`}
          value={values.password}
          onChange={handleChange}
        />
        {errors && (
          <label className="label">
            <span className="label-text text-red-500">{errors.password}</span>
          </label>
        )}
      </div>
      <button onClick={signUp} className="btn btn-primary mt-5 w-full">
        Create an account
      </button>
    </div>
  );
}

const AuthModal = ({ isOpen, handleClose }: LoginModalProps) => {
  const [toggleAuthForm, setToggleAuthForm] = useState<boolean>(false);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="btm-nav top-0 ">
                    <button
                      className={
                        !toggleAuthForm
                          ? "active text-white bg-black"
                          : " text-white bg-[#0000003a]"
                      }
                      onClick={() => setToggleAuthForm(false)}
                    >
                      Sign In
                    </button>
                    <button
                      className={
                        toggleAuthForm
                          ? "active text-white bg-[#000]"
                          : " text-white bg-[#0000003a]"
                      }
                      onClick={() => setToggleAuthForm(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                  {!toggleAuthForm ? (
                    <SignIn handleClose={handleClose} />
                  ) : (
                    <SignUp handleClose={handleClose} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthModal;
