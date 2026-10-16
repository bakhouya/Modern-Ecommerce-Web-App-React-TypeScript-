

import ProductCard from './ProductCard';
import type { IApiProduct } from '../../../types/productTypes';


interface Props { products: IApiProduct[];}


export default function ProductsList({products}: Props) {
    return (
        <section className="products_wrapper">
            <div className="web_container">
                <article className="products_list">
                    {products.slice(0, 8).map((product, index) => (
                        <div key={product.id} data-aos="zoom-in" data-aos-delay={100*index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </article>
            </div>
        </section>
    )
}
