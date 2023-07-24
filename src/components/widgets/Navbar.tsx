import { Badge, Button } from "@mui/material";
import Logo from "../../../public/assets/shoppy-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center w-full bg-[#5a38e4] py-5 px-5 md:py-3 flex-1">
      <div className="flex flex-row justify-center items-center gap-20">
        <img src={Logo} alt="shoppy" width={120} height={120} />
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
      <div className="flex flex-nowrap gap-10 ">
        <Button className="flex flex-nowrap gap-3">
          <LoginIcon sx={{ color: "#fff" }} />
          <p className="text-white capitalize text-lg">Login</p>
        </Button>
        <Button className="flex flex-nowrap gap-3">
          <Badge badgeContent={4} color="warning">
            <ShoppingBasketIcon sx={{ color: "#fff" }} />
          </Badge>
          <p className="text-white capitalize text-lg">Basket</p>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
