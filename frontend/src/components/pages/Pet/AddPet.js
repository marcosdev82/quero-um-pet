import styles from './Addpet.module.css';
import api from '../../../utils/api';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Components */
import PetForm from '../../form/PetForm';

/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    async function registerPet(pet) {
        let msgType = 'success';

        const formData = new FormData();

        Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]); // Corrigido de pet['key'] para pet[key]
            }
        });

        const data = await api
            .post('pets/create', formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data', // Corrigido multpart para multipart
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                msgType = 'error'; // Corrigido de 'Error' para 'error' (assumindo que é minúsculo no setFlashMessage)
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);

        if (msgType !== 'error') {
            navigate('/pets/mypets');
        }
    }

    return (
        <section className={styles.add_petheader}>
            <div>
                <h1>Cadastre um pet</h1>
                <p>Depois ele ficará disponível para adoção</p><br />
            </div>
            <PetForm handleSubmit={registerPet} btnTxt="Cadastrar pet" />
        </section>
    );
}

export default AddPet;
