
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartVariant } from "../../../types/cartTypes";
import { useRemoveCartItem, useUpdateCartItem } from "../../../controllers/useCart";
import { Loading } from "../../../components/ui/LoadingInset";
import toast from "react-hot-toast";

interface CartVariantItemProps {variant: CartVariant; currency: string | undefined}

const CartVariantItem: React.FC<CartVariantItemProps> = ({variant, currency}) => {
    const updateCartItem = useUpdateCartItem();
    const removeCartItem = useRemoveCartItem();

    const handleQuantityChange = (quantity: number) => {
      if (quantity < 1) { return ;}
      updateCartItem.mutate({itemId: variant.id, payload: {quantity}});
    };

    const handleRemove = () => {
      removeCartItem.mutate(variant.id, {
          onSuccess: () => {toast.success("Produit retiré du panier avec succès !");},
          onError: () => {toast.error("Erreur lors de la suppression du produit du panier.");},
      });
    };

    return (
      <div className="cart_variant_item">

        {updateCartItem.isPending && <Loading/>}

        <div className="cart_variant_item_top">
          <div className="cart_item_variant_values">
            {variant.values.map((value) => (
              <span className="text text_xs" key={value.id}> {value.value}</span>
            ))}
          </div>

          <button type="button" className="cart_variant_delete" onClick={handleRemove} disabled={removeCartItem.isPending} aria-label="Remove variant">
            <Trash2 size={16} />
          </button>
        </div>

        <div className="cart_variant_item_bottom">
          <div className="cart_quantity">
            <button
              type="button"
              onClick={() => handleQuantityChange(variant.qty - 1)}
              disabled={updateCartItem.isPending || removeCartItem.isPending || variant.qty <= 1}>
              <Minus size={14} />
            </button>

            <span className="text text_sm weight_500">{variant.qty}</span>

            <button
              type="button"
              onClick={() => handleQuantityChange(variant.qty + 1)}
              disabled={updateCartItem.isPending || removeCartItem.isPending}>
              <Plus size={14} />
            </button>
          </div>

          <span className="text text_sm weight_500">{variant.price}{currency}</span>
        </div>

      </div>
    );
    
};

export default CartVariantItem;
