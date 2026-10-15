

const WEBROUTES = {
    HOME        : "/v1/",
    TRACKORDER  : "/v1/orders/track-order/",
    CHECKOUT    : "/v1/cart/checkout/",
    SEARCHING   : "/v1/searching/",
    POLICY      : "/v1/policies/",
    CATEGORY    : (catID: string) => `/v1/categories/products/${catID}/`,
    PRODUCT     : (id: string) => `/v1/products/${id}/`,
    PRODUCTSOFFER     : (id: string) => `/v1/offer/products/${id}/`,
  
};

export default WEBROUTES;