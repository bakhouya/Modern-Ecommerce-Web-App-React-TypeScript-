import axios from 'axios';
import toast from "react-hot-toast";
import ROUTES from "../../../routers/dashboard/path";
import { useMutation } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';

import { login as loginApi } from '../../../services/dashboard/authService';
import { useAdminAuth } from '../../../context/admin-auth/AdminAuthContext';

import InputText from '../../../components/forms/InputText' ;
import PasswordField from '../../../components/forms/PasswordField' ;
import {useFieldText} from '../../../hooks/useFieldText' ;
import { loginSchema } from "../../../validations/loginSchema" ;

export default function Login() {
  
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAdminAuth();
    const form = useFieldText(loginSchema, {username: "", password: ""});

    const mutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (response) => {login(response); navigate(ROUTES.HOME);},
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Identifiants incorrects";
                toast.error(message);
            } else {
                toast.error("Erreur de connexion");
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = form.validate();
        if (!isValid) return;
        mutation.mutate(form.values);
    };

    if (isAuthenticated) {return <Navigate to={ROUTES.HOME} replace />;}

    return (

        <div className="center_page">

            <div className="login_card">
                <div className="text_center my_end_25">
                    <h1 className="text">Bienvenue</h1>
                    <p className="text text_sm">
                        Veuillez saisir vos informations pour vous connecter à votre compte.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="box_input">
                        <InputText
                            type="text"
                            label="Nom d’utilisateur"
                            value={form.values.username}
                            onChange={(e) => form.handleChange("username", e.target.value)}
                            error={form.errors.username}
                        />
                    </div>
                    <div className="box_input">
                        <PasswordField
                            label="Mot de passe"
                            value={form.values.password}
                            onChange={(e) => form.handleChange("password", e.target.value)}
                            error={form.errors.password}
                        />
                    </div>
                    <button className="btn w_full lg primary" type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? (<span className="btn_loader"></span>) : ("Conexion")}
                    </button>

                </form>

            </div>

        </div>
        
    );
}