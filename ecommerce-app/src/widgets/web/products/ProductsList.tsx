

import ProductCard from './ProductCard';
import type { IApiProduct } from '../../../types/productTypes';


interface Props { products: IApiProduct[];}


export default function ProductsList({products}: Props) {
    return (
        <section className="products_wrapper">
            <div className="web_container">
                <article className="products_list">
                    {products.slice(0, 8).map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </article>
            </div>
        </section>
    )
}
