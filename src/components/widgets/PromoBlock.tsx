// import CountDown from "./CountDown";

import { useTranslation } from "react-i18next";
import CountDown from "./CountDown";

const PromoBlock = () => {
  const [t] = useTranslation();
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(../../assets/shopping.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center ">
        <div className="max-w-md md:max-w-5xl ">
          <h2 className="mb-5 text-3xl font-bold text-white">
            <span className="text-[#a377ee]">SHOPPY</span> {t("offer.title")}
          </h2>
          <p className="mb-5 text-white font-semibold md:text-xl md:leading-8 md:w-[100%] text-center ">
            {" "}
            {t("offer.description")}
          </p>
          <CountDown />
          <button className="btn btn-primary bg-[#783edb] text-white leading-5 outline-none border-none px-3">
            {t("offer.btnLabel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;
