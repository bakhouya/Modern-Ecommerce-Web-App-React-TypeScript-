

import type { IApiProduct } from '../../../types/productTypes';
import ProductCard from '../products/ProductCard';


interface Props { products: IApiProduct[];}


export default function ProductsList2({products}: Props) {
    return (
        <section className="products_wrapper">
            <div className="web_container">
                <article className="products_list">
                    {products.slice(9, 16).map((product, index) => (
                        <div key={product.id} data-aos="zoom-in" data-aos-delay={100*index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </article>
            </div>
        </section>
    )
}
