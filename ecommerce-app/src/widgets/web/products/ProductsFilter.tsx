import { useState } from "react";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { usePublicCategoryParents } from "../../../controllers/useCategory";
import { usePublicBrand } from "../../../controllers/useBrand";
import SearchableSelect from "../../../components/forms/SearchableSelect";

interface ProductsFilterProps {
    resultCount: number;
    onApply: (params: {
        brand?: string;
        main_category?: string;
        min_price?: number;
        max_price?: number;
    }) => void;
}

const ProductsFilter = ({resultCount, onApply}: ProductsFilterProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const { data: categoriesParents = [] } = usePublicCategoryParents();
    const { data: brands = [] } = usePublicBrand();

    /* -------------------------------------------------- */
    /* Apply filters */
    /* -------------------------------------------------- */

    const handleApply = () => {

        const params: {
            brand?: string;
            main_category?: string;
            min_price?: number;
            max_price?: number;
        } = {};

        if (selectedBrand) {
            params.brand = selectedBrand;
        }

        if (selectedCategory) {
            params.main_category = selectedCategory;
        }

        if (minPrice) {
            params.min_price = Number(minPrice);
        }

        if (maxPrice) {
            params.max_price = Number(maxPrice);
        }

        onApply(params);

        setIsOpen(false);
    };

    /* -------------------------------------------------- */
    /* Reset */
    /* -------------------------------------------------- */

    const handleReset = () => {

        setSelectedBrand("");
        setSelectedCategory("");

        setMinPrice("");
        setMaxPrice("");

        onApply({});
    };

    return (
        <>
            <button type="button" className="products-category__filter-button" onClick={() => setIsOpen(true)}>
                <SlidersHorizontal size={18} />
                <span>Filtrer</span>
            </button>

            {isOpen && (
                <div className="products-filter__overlay" onClick={() => setIsOpen(false)}>
                    <div className="products-filter" onClick={(e) => e.stopPropagation()}>
                        <div className="products-filter__header">
                            <div>
                                <h2 className="text text_xl weight_600">Filtrer les produits</h2>
                                <div className="text text_sm">Affinez votre recherche selon vos préférences.</div>
                            </div>

                            <button type="button" className="products-filter__close" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>

                        </div>


                        <div className="products-filter__body">

                            <section className="products-filter__section">

                                <h3 className="text text_md weight_600">Marque</h3>

                                <SearchableSelect
                                    options={[{value: "", label: "Toutes les marques"}, ...brands.map((brand: any) => ({
                                            value: String(brand.id),
                                            label: brand.title,
                                        })),
                                    ]}
                                    value={selectedBrand}
                                    onChange={setSelectedBrand}
                                    placeholder="Sélectionner une marque..."/>

                            </section>



                            <section className="products-filter__section">

                                <h3 className="text text_md weight_600">Catégorie principale</h3>

                                <SearchableSelect
                                    options={[{value: "", label: "Toutes les marques"}, ...categoriesParents.map((category: any) => ({
                                            value: String(category.id),
                                            label: category.title,
                                        })),
                                    ]}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    placeholder="Sélectionner une marque..."/>

                            </section>

                            <section className="products-filter__section">

                                <h3 className="text text_md weight_600">Prix</h3>

                                <div className="products-filter__price">

                                    <div>
                                        <label className="text text_sm"> Prix min</label>
                                        <input type="number" min="0" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
                                    </div>

                                    <span className="text text_md"> | </span>

                                    <div>
                                        <label className="text text_sm"> Prix max </label>
                                        <input type="number" min="0" placeholder="1000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
                                    </div>
                                </div>

                            </section>

                        </div>


                        <div className="products-filter__footer row">

                            <button type="button" className="col_2 btn secondary lg" onClick={handleReset}>
                                <RotateCcw size={20} />
                                <span className="text text_sm"> Réinitialiser </span>
                            </button>

                            <button type="button" className="col_2 btn primary lg" onClick={handleApply}>
                                <span className="text text_sm text_white"> Afficher les résultats </span>
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </>
    );
};

export default ProductsFilter;