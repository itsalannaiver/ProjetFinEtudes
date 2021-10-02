import React from "react";
import img_diploma from "../../../assets/img_diploma.jpg";

export default function Lecole() {
  return (
    <section className="lecole-section">
      <div className="lecole-title">
        <h1>A propos de l'école</h1>
      </div>
      <div className="sides">
        <div className="left-side">
          <h1>
            <span className="name">LOREM IPSUM</span>, porte un projet
            pédagogique unique combinant un haut niveau de maîtrise en
            mathématiques, Physique, Informatique et en analyse économique.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure minima
            quas possimus repellendus voluptates hic quod, ipsam laudantium
            provident facere inventore deserunt aperiam nostrum pariatur ratione
            accusantium aut magnam ipsa accusamus dolor doloremque. Rerum
            aperiam necessitatibus veritatis a dolore non at facere debitis
            veniam. Impedit aperiam libero, commodi dicta dignissimos officiis
            eius dolorum! Architecto ipsam minus laboriosam voluptatem impedit,
            inventore amet tempore, fuga omnis a ipsa laborum repellendus autem
            reiciendis velit iusto perferendis libero delectus debitis expedita
            maiores beatae voluptas magnam! Cumque laudantium distinctio placeat
            nulla minus iste quaerat consectetur ad repellat veritatis ab,
            repudiandae commodi dolor. Odit, ad placeat.
          </p>
          <a href="/">En savoir +</a>
        </div>
        <div className="right-side">
          <img src={img_diploma} alt="" />
        </div>
      </div>
    </section>
  );
}
