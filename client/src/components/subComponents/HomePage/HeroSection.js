import React from "react";
import HeroBackground from "../../../assets/hero_bg.jpg";

export default function HeroSection() {
  return (
    <div className="Hero">
      <img src={HeroBackground} alt="Hero background" />
      <div className="quoteSection">
        <div className="quote">
          <h1 className="mainQuote">LA FORMATION INITIALE</h1>
          <h2 className="subQuote">
            Une nouvelle approche pédagogique
            <br />
            pour la préparation à la haute fonction publique.
          </h2>
        </div>
        <div className="callToAction">
          <button id="contactUs">Contactez Nous</button>
        </div>
      </div>
    </div>
  );
}
