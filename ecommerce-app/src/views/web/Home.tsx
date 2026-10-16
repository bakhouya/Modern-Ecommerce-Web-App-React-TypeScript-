


import { useTranslation } from "react-i18next";

import CategorySlider from '../../widgets/web/categories/CategorySlider';
import { useData } from '../../context/web/DataContext';
import ProductsList from '../../widgets/web/products/ProductsList';
import { useHomePageProducts } from '../../controllers/usePublicProducts';
import { useState } from 'react';
import OffersBanner from '../../widgets/web/offers/OffersBanner';
import ProductServiceInfo from '../../widgets/web/products/ProductServiceInfo';
import HomeSlider from "../../widgets/web/home/HomeSlider";
import { usePublicCategory } from "../../controllers/useCategory";


export default function StoreHome() {
    const { t } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mainCategory] = useState<string | undefined>();

    const { sliders, offers } = useData();
    const { data: homePageProducts = []} = useHomePageProducts({main_category: mainCategory});
    const {data: categories }    = usePublicCategory() ;

    return (
        <main className="main_page">

            <CategorySlider categories={categories ?? []} />

            <HomeSlider sliders={sliders} />

            <OffersBanner offers={offers}/>
                   
            {/* <section className="section_2">
                <ProductSlider products={homePageProducts} categories={categoriesParents} onCategoryChange={setMainCategory} loading={loadingProducts} />
            </section> */}
            <div className="">
                
                <div className="products-section-heading my_20 web_container">
                    <h2 className="products-section-heading__title" data-aos="zoom-in">
                        {t("store.productsSection.titleStart")}{" "}
                        <span>{t("store.productsSection.titleHighlight")}</span>
                    </h2>

                    <p className="products-section-heading__description p_limit_2" data-aos="fade-up-bottom">
                        {t("store.productsSection.description")}
                    </p>

                    <div className="products-section-heading__decoration" data-aos="zoom-in">
                        <span></span>
                    </div>
                </div>
                <ProductsList products={homePageProducts} />
            </div>

            <div className="web_container">
                <ProductServiceInfo />
            </div>

        </main>
    );

}
