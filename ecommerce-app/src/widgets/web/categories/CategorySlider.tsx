
import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import CategoryCard from "./CategoryCard";
import type { CategoryTypes } from "../../../types/categoryTypes";

import "swiper/css";
import "swiper/css/pagination";

interface Props {
  categories: CategoryTypes[];
  title?: string;
}

const CategorySlider: React.FC<Props> = ({ categories }) => {
  const { i18n } = useTranslation();

  if (!categories?.length) return null;

  return (
    <div className="category-slider-wrapper">
      <div className="web_container">
        <Swiper
          key={i18n.language}
          dir={i18n.dir()}
          modules={[Pagination, A11y]}
          spaceBetween={12}
          slidesPerView={3}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={categories.length > 3}
          watchOverflow
          observer
          observeParents
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 8 },
          }}
          className="category-swiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={category.id}>
              <CategoryCard
                category={category}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
