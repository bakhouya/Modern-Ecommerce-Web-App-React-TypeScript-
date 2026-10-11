import { useParams } from "react-router-dom";
import { useHomePageProducts } from "../../controllers/usePublicProducts";
import { LoadingDisplay } from "../../components/ui/LoadingDisplay";
import ProductsList from "../../widgets/web/products/ProductsList";
import { NotFound } from "../../components/ui/NoutFound";
import ProductsFilter from "../../widgets/web/products/ProductsFilter";
import { useState, useEffect } from "react";

interface ProductFilterParams {
    category?: string;
    brand?: string;
    main_category?: string;
    min_price?: number;
    max_price?: number;
}

export const ProductsCategory = () => {
    /* --------------------------------------------------------------------------------------------------- */
    /* Constract Category ID from URL path  */
    /* --------------------------------------------------------------------------------------------------- */
    const { catID } = useParams();
    /* --------------------------------------------------------------------------------------------------- */
    const [filterParams, setFilterParams] = useState<ProductFilterParams>({category: catID});
    useEffect(() => {setFilterParams({category: catID});}, [catID]);

    /* --------------------------------------------------------------------------------------------------- */
    /* Get data products for this category ID from hook query as filter params  */
    /* --------------------------------------------------------------------------------------------------- */
    const {data: homePageProducts = [], isLoading: loadingProducts, isError} = useHomePageProducts(filterParams);
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* display & return the Loading components when geving the data  */
    /* --------------------------------------------------------------------------------------------------- */
    if (loadingProducts) {return (<LoadingDisplay />);}
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* if any error or return empty data => display the components NotFound  */
    /* --------------------------------------------------------------------------------------------------- */
    // if (isError || !homePageProducts.length) {return (<NotFound />);}
    /* --------------------------------------------------------------------------------------------------- */

    /* --------------------------------------------------------------------------------------------------- */
    /* --------------------------------------------------------------------------------------------------- */
    const handleFilter = (filters: Omit<ProductFilterParams, "category">) => {
        setFilterParams({category: catID, ...filters});
    };
    /* --------------------------------------------------------------------------------------------------- */


    /* --------------------------------------------------------------------------------------------------- */
    // Display the gnerale components content 
    /* --------------------------------------------------------------------------------------------------- */
    return (
        <>
        <main className="products-category web_container">

            <section className="products-category__hero">

                <div className="products-category__hero-content">

                    <span className="products-category__eyebrow text text_xs text_primary">Collection</span>
                    <h1>Découvrez nos produits</h1>
                    <p className="text text_sm">Explorez notre sélection de produits disponibles dans cette catégorie.</p>

                </div>

                <div className="products-category__count">
                    <span>{homePageProducts.length}</span>
                    <small>
                        {homePageProducts.length > 1
                            ? "produits"
                            : "produit"}
                    </small>
                </div>

            </section>

            <section className="products-category__content">

                <div className="products-category__top">

                    <div>
                        <h2 className="text text_xl weight_600"> Nos produits</h2>
                        <p className="text text_sm">Une sélection pensée pour répondre à vos besoins.</p>
                    </div>

                    <ProductsFilter resultCount={homePageProducts.length} onApply={handleFilter}/>

                </div>

            </section>
        </main>
        {isError || !homePageProducts.length ? <NotFound /> : <ProductsList products={homePageProducts} />}
        
        </>
    );
    /* --------------------------------------------------------------------------------------------------- */

};