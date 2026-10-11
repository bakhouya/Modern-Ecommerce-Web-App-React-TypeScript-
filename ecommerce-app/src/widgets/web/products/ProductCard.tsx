import React from 'react';
import type { IApiProduct } from '../../../types/productTypes';
import { useSettings } from '../../../context/settings/PublicSettingsContext';
import { Link } from 'react-router-dom';
import WEBROUTES from '../../../routers/web/path';
import ImagePlaceholder from '../../../assets/images/placeholder_product.png' ;


/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
interface Props {product: IApiProduct;}
/*-------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
const ProductCard: React.FC<Props> = ({ product }) => {

  /*-------------------------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------------------------*/
  const { settingsQuery } = useSettings();
  const settings = settingsQuery.data;
  /*-------------------------------------------------------------------------------------------*/



  /*-------------------------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------------------------*/
  const imageSrc = product.image && product.image.length > 0 ? product.image[0].image : ImagePlaceholder; 
  const regularPrice = product.price_regular ? parseFloat(product.price_regular) : 0;
  const salePrice = product.price_sale ? parseFloat(product.price_sale) : 0;
  const displayPrice = salePrice > 0 ? salePrice : regularPrice;
  const discount = (regularPrice > 0 && salePrice > 0 && salePrice < regularPrice)
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0;
  const fullStars = Math.floor(product.rating);
  const emptyStars = 5 - fullStars;
  /*-------------------------------------------------------------------------------------------*/


  /*-------------------------------------------------------------------------------------------*/
  /*-------------------------------------------------------------------------------------------*/
  return (
    <div className="product_card" title={product?.title || ""}>

        <div className="product_card__badge_card_products">
            {product?.has_offer && <span className="badge_sale"> -{discount}% </span>} 
        </div>

        <Link to={WEBROUTES.PRODUCT(product.id)} className="product_card__image">
          <img src={imageSrc} alt={product.title} loading="lazy"/>
        </Link>

        <div className="product_card__content">

          <div className="text text_sm p_limit_2 text_primary"> {product?.main_category} </div>
          <div className="text text_sm p_limit_2"> {product.title} </div>
          <div className="product_card__rating">
              {'★'.repeat(fullStars)} {'☆'.repeat(emptyStars)}
              <span>({product.rating.toFixed(1)})</span>
            </div>
          <div className="flex_between_center">
              
              <div className="product_card__pricing">
                <span className="text text_sm weight_600">{displayPrice.toFixed(2)}{settings?.currency_symbol || "Dh"}</span>
                {discount > 0 && (
                  <span className="old-price text"> {regularPrice.toFixed(2)}{settings?.currency_symbol || "Dh"}</span>
                )}
              </div>

              {/* <div className="product_card__rating">
                {'★'.repeat(fullStars)} {'☆'.repeat(emptyStars)}
                <span>({product.rating.toFixed(1)})</span>
              </div> */}
          </div>         

        </div>

    </div>
  );
  /*-------------------------------------------------------------------------------------------*/

};

export default ProductCard;