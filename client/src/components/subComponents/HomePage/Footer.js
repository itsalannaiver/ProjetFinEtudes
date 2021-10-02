import React from "react";
import icon_FB from "../../../assets/icon_FB.png";
import icon_IG from "../../../assets/icon_IG.png";
import icon_PINTEREST from "../../../assets/icon_PINTEREST.png";
import icon_TWITTER from "../../../assets/icon_TWITTER.png";

export default function Footer() {
  return (
    <section className="Footer">
      <div className="social">
        <a href="/">
          <img src={icon_FB} alt="facebook" />
        </a>
        <a href="/">
          <img src={icon_IG} alt="instagram" />
        </a>
        <a href="/">
          <img src={icon_PINTEREST} alt="twitter" />
        </a>
        <a href="/">
          <img src={icon_TWITTER} alt="pinterest" />
        </a>
      </div>
      <ul className="footer-menu">
        <li className="links">
          <a href="/">Accueil</a>
        </li>
        <li className="links">
          <a href="/">Actualités</a>
        </li>
        <li className="links">
          <a href="/">L'école</a>
        </li>
        <li className="links">
          <a href="/">Nous Contactez</a>
        </li>
      </ul>
      <p className="copyright">Lorem ipsum. All rights reserved © 2021</p>
    </section>
  );
}
