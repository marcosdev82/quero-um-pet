import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

function MyAdoptions() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setPets(response.data.pets);
            console.log(pets)
        })
        .catch((error) => {
            console.error('Erro ao buscar adoções:', error);
            // Você pode adicionar lógica adicional para exibir uma mensagem de erro ao usuário
        });
    }, [token]);

    return <p>Minha adoções</p>
}

export default MyAdoptions;