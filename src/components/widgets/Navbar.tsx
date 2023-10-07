import { useTranslation } from "react-i18next";
import Logo from "../../assets/shoppy-logo.svg";

function Navbar() {
  const [_, i18n] = useTranslation();

  return (
    <div className="navbar bg-[#5a38e4] px-2 fixed z-30">
      <div className="flex-1 flex justify-between md:justify-center">
        <a href="/">
          <img src={Logo} alt="shoppy" width={120} height={120} />
        </a>
      </div>
      <div className="flex relative right-20 gap-2"></div>
      <div className="flex flex-nowrap gap-2 ">
        {i18n.language === "ar" && (
          <button
            className="btn border-info"
            onClick={() => {
              i18n.changeLanguage("fr");
            }}
          >
            AR
          </button>
        )}

        {i18n.language === "fr" && (
          <button
            className="btn border-info"
            onClick={() => {
              i18n.changeLanguage("ar");
            }}
          >
            FR
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
