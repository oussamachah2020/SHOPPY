// import CountDown from "./CountDown";

import CountDown from "./CountDown";

const PromoBlock = () => {
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
            <span className="text-[#a377ee]">SHOPPY</span> BEST OFFERS
          </h2>
          <p className="mb-5 text-white font-semibold md:text-xl md:leading-8 md:w-[100%] text-center ">
            {" "}
            🛍️🎁 Alerte Offre Shopping ! 🎁🛍️ Offrez-vous une virée shopping
            irrésistible avec notre offre exclusive à durée limitée !
            Préparez-vous à vous offrir un monde d'économies et de style.
            Profitez de remises à couper le souffle allant jusqu'à 70% sur les
            dernières tendances de la mode, l'électronique, la décoration
            intérieure, etc.
          </p>
          <CountDown />
          <button className="btn bg-[#783edb] text-white leading-5 outline-none border-none px-3">
            Dépêchez-vous et découvrez nos meilleures offres
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBlock;