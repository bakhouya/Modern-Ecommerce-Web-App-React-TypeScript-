
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";


export interface HomeSliderItem {
  id: string | number;
  image: string;
  url: string;
  title?: string;
  description?: string;
}

interface HomeSliderProps {
  sliders: HomeSliderItem[];
}

const HomeSlider = ({ sliders }: HomeSliderProps) => {
  const { i18n } = useTranslation();

  if (!sliders?.length) return null;

  return (
    <section className="hero_home_page web_container">
        <section className="store_home">
        <Swiper
            key={i18n.language}
            modules={[Navigation, Pagination, Autoplay]}
            navigation={sliders.length > 1}
            pagination={
            sliders.length > 1 ? { clickable: true } : false
            }
            autoplay={
            sliders.length > 1
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }
                : false
            }
            loop={sliders.length > 1}
            speed={800}
            observer
            observeParents
            watchOverflow
            dir={i18n.dir()}
            className="store_home__slider"
        >
            {sliders.map((slide) => (
            <SwiperSlide key={slide.id}>
                <Link to={slide.url} className="slide_content">
                <img
                    src={slide.image}
                    alt={slide.title || ""}
                    loading="eager"
                    draggable={false}
                />

                <div className="slide_content__bg" />
                <div className="slide_content__overlay" />
                </Link>
            </SwiperSlide>
            ))}
        </Swiper>
        </section>
    </section>
  );
};

export default HomeSlider;
