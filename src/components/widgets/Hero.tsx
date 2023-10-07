import { useTranslation } from "react-i18next";

const Hero = () => {
  const [t, i18n] = useTranslation();

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(../../assets/shopping-online.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center ">
        <div className="max-w-md md:max-w-5xl ">
          <h2 className="mb-5 text-3xl font-bold text-white">
            {i18n.language === "ar" ? (
              <>
                <span className="uppercase text-[#a17edd]">
                  {t("storeName")}{" "}
                </span>
                {t("title")}{" "}
              </>
            ) : (
              <>
                {t("title")}{" "}
                <span className="uppercase text-[#a17edd]">
                  {t("storeName")}{" "}
                </span>
              </>
            )}
          </h2>

          <p className="mb-5 text-white font-semibold md:text-xl md:leading-8 md:w-[100%] text-center ">
            {" "}
            {t("description")}
          </p>
          <a href="#products">
            <button className="btn btn-primary text-white">
              {t("btnText")}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
