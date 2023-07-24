import { Button } from "@mui/material";
import React from "react";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-cover py-32 px-24">
        <h1 className="font-semibold text-4xl text-white">
          Bienvenue à <span className="uppercase text-[#8048e0]">shoppy</span>
        </h1>
        <p className="py-10 w-[80%] font-medium text-white text-xl">
          Nous sommes fiers d'offrir une sélection diversifiée et organisée de
          produits, allant des dernières tendances de la mode à l'électronique
          de pointe et tout le reste. Avec notre interface conviviale et nos
          options de paiement sécurisées, faire du shopping chez Shoppy est un
          jeu d'enfant.
        </p>
        <Button
          sx={{
            color: "#8048e0",
            textTransform: "capitalize",
            backgroundColor: "#fff",
            py: 1,
            width: "8%",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#8048e0",
            },
          }}
        >
          Explore Plus
        </Button>
      </div>
    </div>
  );
};

export default Hero;
