import * as yup from "yup";

export const AuthSignUpSchema = yup.object().shape({
  username: yup.string().required("Username Required").min(6),
  email: yup.string().required("Email Required").email(),
  password: yup.string().required("Password Required").min(8),
});

export const PurchaseSchema = yup.object().shape({
  name: yup.string().required("Name Required"),
  phone: yup.string().required("Phone Required"),
  address: yup.string().required("Address Required"),
  city: yup.string().required("City Required"),
});
