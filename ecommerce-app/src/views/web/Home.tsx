
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductSlider from '../../widgets/web/products/ProductSlider';
import CategorySlider from '../../widgets/web/categories/CategorySlider';
import { useData } from '../../context/web/DataContext';
import ProductsList from '../../widgets/web/products/ProductsList';
// import Services from '../../widgets/web/services/Service';
import { usePublicCategoryParents } from '../../controllers/useCategory';
import { useHomePageProducts } from '../../controllers/usePublicProducts';
import { useState } from 'react';
import OffersBanner from '../../widgets/web/offers/OffersBanner';
import ProductServiceInfo from '../../widgets/web/products/ProductServiceInfo';
// homePageServices

export default function StoreHome() {
    const [mainCategory, setMainCategory] = useState<string | undefined>();

    const { sliders, categories, offers } = useData();
    const { data: homePageProducts = [], isLoading: loadingProducts} = useHomePageProducts(
        {main_category: mainCategory}        
    );
    const {data: categoriesParents }    = usePublicCategoryParents();

    return (

        <main className="main_page">
            
            <CategorySlider categories={categories} />

            <section className="hero_home_page web_container">

                <section className="store_home ">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        effect="slide"
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        speed={800}
                        observer={true}                 
                        observeParents={true}
                        className="store_home__slider">

                        {sliders.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <Link to={slide.url} className="slide_content">
                                    {/* Fond image en arrière-plan */}
                                    <img src={slide.image} alt="" loading="lazy"/>
                                    <div className="slide_content__bg"/>
                                    {/* Overlay pour lisibilité */}
                                    <div className="slide_content__overlay" />
                                    {/* Texte et bouton */}
                                    {/* <div className="slide_content__text">
                                        <h2 className="slide_content__title text text_xxl">{slide.title}</h2>
                                        <p className="slide_content__description text text_sm p_limit_2 ">{slide.description}</p>
                                    </div> */}
                                </Link>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </section>

            </section>

            <OffersBanner offers={offers}/>
                   
            {/* <section className="section_2">
                <ProductSlider products={homePageProducts} categories={categoriesParents} onCategoryChange={setMainCategory} loading={loadingProducts} />
            </section> */}
            <div className="">
                <div className="my_20">
                    <div className="text text_xxl weight_600 text_center"> Découvrez nos produits </div>
                    <div className="text text_sm text_center"> 
                        Explorez notre sélection de produits soigneusement choisis pour vous offrir qualité, style et satisfaction au quotidien.
                    </div>
                    <span className="header-line"></span>
                </div>
                <ProductsList products={homePageProducts} />
            </div>
            <div className="web_container">
                <ProductServiceInfo />
            </div>

        </main>

    );

}
