import { Fragment } from "react";
import { AuthSignUpSchema } from "../../types/validation.schemas";
import { useFormik } from "formik";
import { signInType } from "../../types/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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
        navigate("/admin");
        return userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div>
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
          type="submit"
          className="btn btn-primary mt-5 w-full"
          onClick={signIn}
        >
          Login
        </button>
      </form>
    </div>
  );
}

const AuthModal = () => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => console.log("ok")}
      >
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
                <Login />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
