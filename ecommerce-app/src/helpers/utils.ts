
import { AxiosError } from 'axios';

export const getInitials = (name?: string) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 1)
      .join("")
      .toUpperCase();
};


export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    if (error instanceof AxiosError) {
        return error.response?.data?.message || defaultMessage;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return defaultMessage;
};




