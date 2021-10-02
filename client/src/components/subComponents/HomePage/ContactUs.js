import React from "react";
import img_contactUS from "../../../assets/img_contactUS.jpg";

export default function ContactUs() {
  return (
    <section className="ContactUs">
      <div className="TextArea">
        <h1>Contactez Nous</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          <br />
          Rem reiciendis non inventore!
        </p>
        <img src={img_contactUS} alt="" />
      </div>
      <div className="ContactUsArea">
        <form>
          <input
            type="text"
            name="nom"
            id="nom"
            placeholder="Votre nom complet"
          />
          <input type="text" name="email" id="email" placeholder="Email" />
          <input type="text" name="sujet" id="sujet" placeholder="Sujet" />
          <textarea
            name="message"
            id="message"
            cols="100"
            rows="7"
            placeholder="Entrez votre message"
          ></textarea>
          <input type="submit" name="envoyer" id="envoyer" value="Envoyer" />
        </form>
      </div>
    </section>
  );
}
