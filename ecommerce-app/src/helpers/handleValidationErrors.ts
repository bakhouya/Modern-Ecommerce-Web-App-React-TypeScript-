

import toast from "react-hot-toast";

export const handleBackendErrors = (error: any, setErrors: any) => {
    const data = error.response?.data;
    const status = error.response?.status;

    if (status === 400 && data && typeof data === 'object') {

        const newErrors: Record<string, string> = {};

        for (const key in data) {

            const msg = Array.isArray(data[key]) ? data[key][0] : data[key];
            if (typeof msg === 'string' && msg.trim()) newErrors[key] = msg;
            
        }
        if (Object.keys(newErrors).length > 0) setErrors(newErrors);

        else toast.error(data?.non_field_errors?.[0] || data?.detail || "Erreur de validation");
    } else {
        toast.error("Erreur de connexion");
    }


};