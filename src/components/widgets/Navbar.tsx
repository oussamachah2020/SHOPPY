import { Button } from "@mui/material";
import Logo from "../../assets/shoppy-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
// import LoginIcon from "@mui/icons-material/Login";
// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import AuthModal from "../Modals/AuthModal";
// import { auth } from "../../firebase";
// import toast from "react-hot-toast";
// import useAuthStore from "../../store/authStore";

function Navbar() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // const user = useAuthStore((v) => v.user);
  // const userEmail = user?.email?.[0];

  // const handleClose = () => {
  //   setIsOpen(false);
  // };
  // const handleOpen = () => {
  //   setIsOpen(true);
  // };

  // const Logout = () => {
  //   signOut(auth);
  //   toast.success("logout completed");
  // };

  return (
    <div className="navbar bg-[#5a38e4] px-2">
      <div className="flex-1 flex justify-center">
        <a href="/">
          <img src={Logo} alt="shoppy" width={120} height={120} />
        </a>
      </div>
      <div className="flex relative right-20 gap-2"></div>
      <div className="flex flex-nowrap gap-2 ">
        <details className="dropdown ">
          <summary className="btn btn-ghost bg-transparent border-none">
            <p className="text-white capitalize text-lg">Language</p>
          </summary>
          <ul className="shadow menu dropdown-content z-[1] bg-white text-purple-600 rounded-box w-40 p-2">
            <li className="text-start  text-black">
              <button>Frençais</button>
            </li>
            <li className=" text-black">
              <button>Arabe</button>
            </li>
          </ul>
        </details>
      </div>

      {/* {user?.uid ? (
        <div className="dropdown dropdown-end">
          <div className="ml-5">
            <label tabIndex={0} className="cursor-pointer">
              <Avatar
                sx={{
                  bgcolor: "#A689E1",
                }}
              >
                {userEmail}
              </Avatar>
            </label>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={Logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <Button className="flex flex-nowrap mr-5" onClick={handleOpen}>
          <LoginIcon sx={{ color: "#fff" }} className="mr-2" />
          <p className="text-white capitalize text-lg">Login</p>
        </Button>
      )}

      <AuthModal {...{ isOpen, handleClose }} /> */}
    </div>
  );
}

export default Navbar;
