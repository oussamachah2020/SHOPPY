import { Avatar, Button } from "@mui/material";
import Logo from "../../assets/shoppy-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import AuthModal from "../Modals/AuthModal";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const user = useAuthStore((v) => v.user);
  const userEmail = user?.email?.[0];

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const Logout = () => {
    signOut(auth);
    toast.success("logout completed");
  };

  return (
    <div className="navbar bg-[#5a38e4] px-2">
      <div className="flex-1">
        <a href="/">
          <img src={Logo} alt="shoppy" width={120} height={120} />
        </a>
      </div>
      <div className="flex relative right-20 gap-2">
        <div className="form-control hidden md:block">
          <div className="relative hidden md:block">
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#A689E1",
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
                "&:hover": {
                  backgroundColor: "#A689E1",
                },
              }}
            >
              <SearchIcon />
            </Button>
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-[2em] md:w-[50em] bg-white "
            />
          </div>
        </div>
      </div>
      <div className="flex flex-nowrap gap-2 ">
        {/* <details className="dropdown ">
          <summary className="btn btn-ghost bg-transparent border-none">
            <Badge badgeContent={selectedProducts.length} color="warning">
              <ShoppingBasketIcon sx={{ color: "#fff" }} />
            </Badge>
            <p className="text-white capitalize text-lg">Basket</p>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-purple-700 text-white rounded-box w-52">
            <li>
              <Link to={"/purchases"}>Check your items</Link>
            </li>
            <li>
              <Link to={""} onClick={emptyBasket}>
                Empty your basket
              </Link>
            </li>
          </ul>
        </details> */}
      </div>

      {user?.uid ? (
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

      <AuthModal {...{ isOpen, handleClose }} />
    </div>
  );
}

export default Navbar;
