


/* ---------------------------------------------------------------------------------*/
/* Imports */
/* ---------------------------------------------------------------------------------*/
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../helpers/utils';
import type { TFunction } from 'i18next';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* Type definitions */
/* ---------------------------------------------------------------------------------*/
type ServiceParams = object ;
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* CRUD service contract */
/* Defines all required service methods */
/* ---------------------------------------------------------------------------------*/
interface CrudService<TData, TFormData, TParams extends ServiceParams = ServiceParams> {
    getAll: (params: TParams) => Promise<TData>;
    create: (data: TFormData) => Promise<unknown>;
    update: (id: string | number, data: TFormData) => Promise<unknown>;
    delete: (id: string | number) => Promise<unknown>;
    bulkDelete: (ids: (string | number)[]) => Promise<unknown>;
}
/* ---------------------------------------------------------------------------------*/



/* ---------------------------------------------------------------------------------*/
/* Custom success and error messages */
/* ---------------------------------------------------------------------------------*/
interface CrudMessages {
    createSuccess?: string;
    updateSuccess?: string;
    deleteSuccess?: string;
    bulkDeleteSuccess?: string;
    createError?: string;
    updateError?: string;
    deleteError?: string;
    bulkDeleteError?: string;
}
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* CRUD hooks factory */
/* Generates reusable React Query CRUD hooks */
/* ---------------------------------------------------------------------------------*/
export function createCrudHooks<TData, TFormData, TParams extends ServiceParams = ServiceParams>(
    {service, queryKey, t, messages = {}}: 
    {service: CrudService<TData, TFormData, TParams>; queryKey: string; t: TFunction; messages?: CrudMessages;}) {

    /*-------------------------------------------------------------------------------*/ 
    /* Default localized feedback messages */
    /*-------------------------------------------------------------------------------*/ 
    const defaultMessages: CrudMessages = {
        createSuccess: t('messages.create.success'),
        updateSuccess: t('messages.update.success'),
        deleteSuccess: t('messages.delete.success'),
        bulkDeleteSuccess: t('messages.delete.success'),
        createError: t('messages.create.error'),
        updateError: t('messages.update.error'),
        deleteError: t('messages.delete.error'),
        bulkDeleteError: t('messages.delete.error'),
    };
    /*-------------------------------------------------------------------------------*/ 

    /*-------------------------------------------------------------------------------*/ 
    /* Merge default messages with custom overrides */
    /*-------------------------------------------------------------------------------*/ 
    const msg = { ...defaultMessages, ...messages };
    /*-------------------------------------------------------------------------------*/ 


    /*-------------------------------------------------------------------------------*/ 
    /* Fetch all records */
    /*-------------------------------------------------------------------------------*/ 
    const useAll = (params: TParams) => {
        return useQuery({
            queryKey: [queryKey, params],
            queryFn: () => service.getAll(params),
            placeholderData: (previousData) => previousData,
            staleTime: 3600000,      
            gcTime: 3600000, 
            refetchOnWindowFocus: false,  
            refetchOnReconnect: false, 
        });
    };
    /*-------------------------------------------------------------------------------*/ 

    /*-------------------------------------------------------------------------------*/ 
    /* Create a new record */
    /*-------------------------------------------------------------------------------*/ 
    const useCreate = () => {
        const queryClient = useQueryClient();
        return useMutation({
        mutationFn: service.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast.success(msg.createSuccess!);
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, msg.createError!));
            return Promise.reject(error);
        },
        });
    };
    /*-------------------------------------------------------------------------------*/ 

    /*-------------------------------------------------------------------------------*/ 
    /* Update an existing record */
    /*-------------------------------------------------------------------------------*/ 
    const useUpdate = () => {
        const queryClient = useQueryClient();
        return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: TFormData }) =>
            service.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast.success(msg.updateSuccess!);
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, msg.updateError!));
            return Promise.reject(error);
        },
        });
    };
    /*-------------------------------------------------------------------------------*/ 

    /*-------------------------------------------------------------------------------*/ 
    /* Delete a single record */
    /*-------------------------------------------------------------------------------*/ 
    const useDelete = () => {
        const queryClient = useQueryClient();
        return useMutation({
        mutationFn: service.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast.success(msg.deleteSuccess!);
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, msg.deleteError!));
        },
        });
    };
    /*-------------------------------------------------------------------------------*/ 

    /*-------------------------------------------------------------------------------*/
    /* Delete multiple records */ 
    /*-------------------------------------------------------------------------------*/ 
    const useBulkDelete = () => {
        const queryClient = useQueryClient();
        return useMutation({
        mutationFn: service.bulkDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast.success(msg.bulkDeleteSuccess!);
        },
        onError: (error: unknown) => {
            toast.error(getErrorMessage(error, msg.bulkDeleteError!));
        },
        });
    };
    /*-------------------------------------------------------------------------------*/ 

    /*-------------------------------------------------------------------------------*/
    /* Expose all generated CRUD hooks */ 
    /*-------------------------------------------------------------------------------*/ 
    return {useAll, useCreate, useUpdate, useDelete, useBulkDelete};
    /*-------------------------------------------------------------------------------*/ 

}
/* ---------------------------------------------------------------------------------*/



