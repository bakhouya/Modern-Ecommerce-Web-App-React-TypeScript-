



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import { UserService } from '../services/users/userService';
import type { UserFilterTypes, UserFormData, UsersResponseTypes, UserTypes } from '../types/userTypes';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createUsersHooks = (t: TFunction) => {
    return createCrudHooks<UsersResponseTypes<UserTypes>, UserFormData, UserFilterTypes >({
        service: UserService ,
        queryKey: 'users' ,
        t,
    });
};
/* ---------------------------------------------------------------------------------*/


