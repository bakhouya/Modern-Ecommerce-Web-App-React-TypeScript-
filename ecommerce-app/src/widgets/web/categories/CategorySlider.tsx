
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import CategoryCard from './CategoryCard';
import type { CategoryTypes } from '../../../types/categoryTypes';



interface Props {categories: CategoryTypes[]; title?: string;}


const CategorySlider: React.FC<Props> = ({ categories }) => {
  return (
    <div className="category-slider-wrapper">
        <div className="web_container">
            {/* <div className="section-header">
                <div className="text text_xxl weight_600 text_center"> Meilleurs Categories et plus </div>
                <span className="header-line"></span>
            </div> */}

            <Swiper
                modules={[Pagination, A11y]}
                spaceBetween={15}
                slidesPerView={3}
                pagination={{ clickable: true, dynamicBullets: true }}
                // autoplay={{ Autoplay, 
                //     delay: 3500,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true,
                // }}
                loop={true}
                breakpoints={{
                    480: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 8 },
                }}
                className="category-swiper">
                {categories.map((category, index) => (
                <SwiperSlide key={category.id}>
                    <CategoryCard category={category} index={index} />
                </SwiperSlide>
                ))}
            </Swiper>

        </div>
    </div>
  );
};

export default CategorySlider;


