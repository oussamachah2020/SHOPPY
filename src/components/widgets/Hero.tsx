import { useTranslation } from "react-i18next";

const Hero = () => {
  const [t] = useTranslation("global");

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
            {t("title.welcome")}{" "}
            <span className="uppercase text-[#8048e0]">shoppy</span>
          </h2>
          <p className="mb-5 text-white font-semibold md:text-xl md:leading-8 md:w-[100%] text-center ">
            {" "}
            {t("subTitle.description")}
          </p>
          <button className="btn btn-primary">{t("explore.content")}</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
