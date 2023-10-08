const Hero = () => {
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
            Bienvenue à <span className="uppercase text-[#946bdb]">SHOPPY</span>
          </h2>

          <p className="mb-5 text-white font-semibold md:text-xl md:leading-8 w-[100%] text-center ">
            Nous sommes fiers d'offrir une sélection diversifiée et organisée de
            produits, allant des dernières tendances de la mode à l'électronique
            de pointe et tout le reste. Avec notre interface conviviale et nos
            options de paiement sécurisées, faire du shopping chez Shoppy est un
            jeu d'enfant.
          </p>
          <a href="#products">
            <button className="btn btn-primary text-white">Exploitez</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
