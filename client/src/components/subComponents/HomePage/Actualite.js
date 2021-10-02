import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import article_inscrip from "../../../assets/article_inscrip.jpg";
import article_activiteCAD from "../../../assets/article_activiteCAD.jpg";
import article_rentree from "../../../assets/article_rentree.jpg";
import article_lorem from "../../../assets/article_lorem.jpg";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation]);

function Actualite() {
  return (
    <section className="articles-section">
      <div className="actualite-title">
        <h1>Nos Actualités</h1>
      </div>

      <div className="actualite-container">
        <Swiper
          className="swiper"
          spaceBetween={-50}
          slidesPerView={3}
          navigation
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
        >
          <SwiperSlide className="actualite">
            <article className="article">
              <h1>Inscription Ouverte</h1>
              <h6>Lorem ipsum dolor sit, amet consectetur adipisicing...</h6>
              <a href="/">En savoir +</a>
              <img src={article_inscrip} alt="Inscription ouverte" />
            </article>
          </SwiperSlide>
          <SwiperSlide className="actualite">
            <article className="article">
              <h1>Activités CAD</h1>
              <h6>Lorem ipsum dolor sit, amet consectetur adipisicing...</h6>
              <a href="/">En savoir +</a>
              <img src={article_activiteCAD} alt="" />
            </article>
          </SwiperSlide>
          <SwiperSlide className="actualite">
            <article className="article">
              <h1>C'est La Rentrée</h1>
              <h6>Lorem ipsum dolor sit, amet consectetur adipisicing...</h6>
              <a href="/">En savoir +</a>
              <img src={article_rentree} alt="" />
            </article>
          </SwiperSlide>
          <SwiperSlide className="actualite">
            <article className="article">
              <h1>Lorem ipsum dolor sit</h1>
              <h6>Lorem ipsum dolor sit, amet consectetur adipisicing...</h6>
              <a href="/">En savoir +</a>
              <img src={article_lorem} alt="" />
            </article>
          </SwiperSlide>
          <SwiperSlide className="actualite">
            <article className="article">
              <h1>Lorem ipsum dolor sit</h1>
              <h6>Lorem ipsum dolor sit, amet consectetur adipisicing...</h6>
              <a href="/">En savoir +</a>
              <img src={article_lorem} alt="" />
            </article>
          </SwiperSlide>
          <SwiperSlide className="actualite">
            <article className="article">
              <h1>Lorem ipsum dolor sit</h1>
              <h6>Lorem ipsum dolor sit, amet consectetur adipisicing...</h6>
              <a href="/">En savoir +</a>
              <img src={article_lorem} alt="" />
            </article>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default Actualite;
