

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import ProductCard from './ProductCard';
import type { IApiProduct } from '../../../types/productTypes';
import type { CategoryTypesParents } from '../../../types/categoryTypes';
import { NotFound } from '../../../components/ui/NoutFound';
import { Loading } from '../../../components/ui/LoadingInset';

interface Props { 
    products: IApiProduct[]; 
    categories?: CategoryTypesParents[]; 
    onCategoryChange?: (categoryId?: string) => void;
    loading: boolean ;
}

const ProductSlider: React.FC<Props> = ({ products,  categories, onCategoryChange, loading }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>();


    const handleCategoryClick = (categoryId?: string) => {setSelectedCategory(categoryId); onCategoryChange?.(categoryId);};

    return (
        <div className="product-slider-wrapper">
            
            <div className="filters_products_as">
                <div key={"Tous Elements"} className={`filter_as_item ${!selectedCategory ? 'active' : ''}`}  onClick={() => handleCategoryClick()}>
                    <div className="text text_sm weight_500"> Tous </div>
                </div>
                {categories?.slice(0, 8).map((category) => (
                    <div key={category.id} className={`filter_as_item ${selectedCategory === category.id ? 'active' : ''}`} onClick={() => handleCategoryClick(category.id)}>
                        <div className="text text_sm weight_500"> {category?.title} </div>
                    </div>
                ))}
            </div>
            
            <div className="web_container">
                {/* <div className="section-header">
                    <div className="">
                        <div className="text text_xxl weight_600 text_center"> Découvrez nos produits </div>
                        <div className="text text_sm text_center"> 
                            Explorez notre sélection de produits soigneusement choisis pour vous offrir qualité, style et satisfaction au quotidien.
                        </div>
                        <span className="header-line"></span>
                    </div>
                </div> */}

                {/* <div className="filters_products_as">
                    <div key={"Tous Elements"} className={`filter_as_item ${!selectedCategory ? 'active' : ''}`}  onClick={() => handleCategoryClick()}>
                        <div className="text text_sm weight_500"> Tous </div>
                    </div>
                    {categories?.slice(0, 8).map((category) => (
                        <div key={category.id} className={`filter_as_item ${selectedCategory === category.id ? 'active' : ''}`} onClick={() => handleCategoryClick(category.id)}>
                            <div className="text text_sm weight_500"> {category?.title} </div>
                        </div>
                    ))}
                </div> */}
                {loading && (<Loading />) }
                
                {products?.length > 0 ?

                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, A11y]}
                        spaceBetween={12}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="my-swiper">
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                :  <NotFound/> }

                

            </div>

        </div>
    );
};

export default ProductSlider;