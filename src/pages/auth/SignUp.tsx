import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import GoogleIcon from "../../../public/assets/google.svg";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 10,
  border: "1px solid #fff",
  p: 4,
  color: "black",
  borderRadius: 3,
};

export default function SignUp() {
  const [passwordVisisblity, setPasswordVisisblity] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisisblity(!passwordVisisblity);
  };

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign up
          </Typography>
          <form className="mt-5">
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text text-black">FullName</span>
              </label>
              <input
                type="text"
                placeholder="Joe Doe"
                className="input input-primary bg-white text-black"
              />
            </div>
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="text"
                placeholder="info@site.com"
                className="input input-primary bg-white text-black"
              />
            </div>

            <div className="form-control mt-3 relative">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <button
                type="button"
                className="absolute right-5 bottom-3"
                onClick={togglePasswordVisibility}
              >
                {!passwordVisisblity ? (
                  <VisibilityOffIcon />
                ) : (
                  <RemoveRedEyeIcon />
                )}
              </button>
              <input
                type={!passwordVisisblity ? "password" : "text"}
                placeholder="8 characters max"
                className="input input-primary bg-white text-black"
              />
            </div>
            <button className="btn btn-primary mt-5 w-full">
              Create an account
            </button>
          </form>
          <div className="divider">OR</div>
          <button className="btn btn-outline text-black w-full">
            <img src={GoogleIcon} alt="google" width={25} height={25} />
            Sign up with Google
          </button>
        </Box>
      </Modal>
    </div>
  );
}
