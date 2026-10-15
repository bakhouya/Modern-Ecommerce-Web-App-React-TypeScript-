


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import type { RoleFilterTypes, RoleFormData, RoleResponseTypes} from '../types/RolesTypes';
import { GroupsService, PermissionsService, RoleService } from '../services/settings/roleService';
import { useQuery } from '@tanstack/react-query';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createRoleHooks = (t: TFunction) => {
    return createCrudHooks<RoleResponseTypes, RoleFormData, RoleFilterTypes >({
        service: RoleService,
        queryKey: 'roles',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePermissions = () => {
    return useQuery({
        queryKey: ['permissions', 'list'],
        queryFn: PermissionsService,
        placeholderData: (previousData) => previousData,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const useGroups = () => {
    return useQuery({
        queryKey: ['groups', 'list'],
        queryFn: GroupsService,
        placeholderData: (previousData) => previousData,
    });
};
/* ---------------------------------------------------------------------------------*/


