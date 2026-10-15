

import { AxiosError } from 'axios';

interface ErrorDisplayProps {
    error: Error | null;           
    refetch?: () => void;          
    showDetails?: boolean;        
}

export const ErrorDisplay = ({ error, refetch}: ErrorDisplayProps) => {
    let statusCode: number | undefined;
    let errorMessage: string = "Une erreur est survenue.";

    if (error) {
        errorMessage = error.message || "Une erreur inconnue est survenue.";

        if (error instanceof AxiosError && error.response) {
            const response = error.response;
            statusCode = response.status;
        }
        else if ('status' in error && typeof error.status === 'number') {statusCode = error.status;}
    }

    return (
        <div className="flex_center_center spaners_container">
            <div className="text_center">
                <div className="text_xl weight_600 my_end_3">
                    {statusCode ? `Erreur ${statusCode}` : 'Erreur'}
                </div>
                <p className="text text_sm text_danger">{errorMessage}</p>
                
            
                {refetch && (
                    <div className="flex_center_center">
                        <button onClick={refetch} className="btn lg primary my_start_4">
                            <span className="text text_sm">Réessayer</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};



