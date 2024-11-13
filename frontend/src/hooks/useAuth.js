import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Alteração para useNavigate
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    let msgText = 'Cadastro realizado com sucesso';
    let msgType = 'success';

    useEffect(() => {
        const token = localStorage.getItem('token')
        api.defaults.headers.Authorization = `Bearer ${token}`;
        if (token) {
            setAuthenticated(true)
        }
    },[])

    async function register(user) {
        try {
            const data = await api.post('/users/register', user).then(response => response.data);

            await authUser(data);
        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    }

    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/'); // Alteração para redirecionar com useNavigate
    }

    function logout() {
        const msgText = 'Logout realizado com sucesso';
        const msgType = 'success';
    
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        navigate('/'); // Corrigido para usar navigate como função
    
        setFlashMessage(msgText, msgType);
    }

    return { authenticated, register, logout };
}