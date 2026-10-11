

import { useTranslation } from "react-i18next";
import type { Cart } from "../../../types/cartTypes";
import { X } from "lucide-react";
import CartVariantItem from "./CartVariantItem";
import { Link } from "react-router-dom";
import { useSettings } from "../../../context/settings/PublicSettingsContext";
import { NotFound } from "../../../components/ui/NoutFound";
import WEBROUTES from "../../../routers/web/path";
import ImagePlaceholder from '../../../assets/images/placeholder_product.png' ;

interface CartModalProps { isOpen: boolean; onClose: () => void; cart: Cart | null;}

const CartModal = ({ isOpen, onClose, cart}: CartModalProps) => {
      const { t } = useTranslation();
      const { settingsQuery }             = useSettings();
      const settings                      = settingsQuery.data ;
      const products                      = cart?.products ?? [] ;

      if (!isOpen) return null;

      return (

        <div className="cart_modal_overlay" onClick={onClose}>
          <div className="cart_modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart_modal_header">
              <div>
                <div className="text text_xl weight_600"> 
                    {t("store.drops.myCart")}  
                    <span> {" "}{cart?.items ?? 0} {t("store.drops.items")}</span> 
                </div> 
              </div>

              <button type="button" className="cart_modal_close" onClick={onClose}> <X size={18}/> </button>
            </div>

            <div className="cart_modal_body">
              {products.length === 0 ? (
                <NotFound />
              ) : (
                products.map((product) => (
                  <div className="cart_item" key={product.id}>
                    <div className="cart_item_image">
                      <img src={product.image || ImagePlaceholder} alt={product.name}/>
                    </div>

                    <div className="cart_item_info">
                      <div className="flex_between_start">
                          <div className="text text_sm p_limit_2 text_start">{product.name}</div>
                          <div className="products_cart_prices">
                            {product.total < product.price && <div className="text text_sm text_underline"> ${product.price}{settings?.currency_symbol} </div> } 
                            <div className="text text_sm weight_600 text_primary">{product.total}{settings?.currency_symbol}</div>  
                          </div>
                      </div>
                      
                      <div className="cart_product_variants">
                        {product.variants.map((variant) => (
                          <CartVariantItem key={variant.id} variant={variant} currency={settings?.currency_symbol}/>
                        ))}
                      </div>
                    </div>

                    
                  </div>
                ))
              )}
            </div>

            {cart && products.length > 0 && (
              <>
              <div className="cart_modal_footer">
                <div className="cart_summary">

                  <div className="row gap_10">
                      <div className="col_2 price_item_summart">
                        <div className="text text_sm"> {t("store.drops.subtotal")} </div>
                        <div className="text text_md weight_600">{cart.total}{settings?.currency_symbol}</div>
                    </div>
                    <div className="col_2 price_item_summart">
                        <div className="text text_sm"> {t("store.drops.savings")} </div>
                        <div className="text text_md weight_600 text_success">-{cart.save}{settings?.currency_symbol}</div>
                    </div>
                  </div>

                  <div className="action_cart">
                        <Link to={WEBROUTES.CHECKOUT} type="button" className="full_width btn primary lg radius_30">
                          <div className="text text_sm text_white weight_600"> {t("store.drops.checkout")} ({cart.discount}{settings?.currency_symbol}) </div>
                        </Link>
                  </div>
                
                </div>

              
              </div>
              </>
            )}
          </div>
        </div>

      );

};

export default CartModal;
