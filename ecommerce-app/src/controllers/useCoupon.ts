


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import { CouponService } from '../services/marketings/CouponServices';
import type { CouponApiPaginatedResponse, CouponFilterTypes, CouponFormData, CouponTypes } from '../types/couponTypes';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createCouponHooks = (t: TFunction) => {
    return createCrudHooks<CouponApiPaginatedResponse<CouponTypes>, CouponFormData, CouponFilterTypes >({
        service: CouponService,
        queryKey: 'coupons',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/




