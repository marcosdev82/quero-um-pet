import api from '../../../utils/api';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoundedImage from '../../layout/RoundedImage';

import styles from './Dashboard.module.css';
/** hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function MyPets() {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        if (!token) {
            setFlashMessage('Token não encontrado. Por favor, faça login novamente.', 'error');
            return;
        }
        const fetchPets = async () => {
            api.get('/pets/mypets', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setPets(response.data.pets);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao buscar os pets.';
                setFlashMessage(errorMessage, 'error');
            });
        }
        fetchPets();

    }, [token, setFlashMessage]);

    return (
        <section>
            <h1>MyPets</h1>
            <Link to="/pet/add">Cadastrar pet</Link>
            <div className={styles.petlist_container}>
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <div className={styles.petlist_row} key={pet._id}>
                            <RoundedImage 
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="77px"
                            />
                            <span className="bold">{pet.name}</span>
                        </div>
                    ))
                ) : (
                    <p>Não há pets cadastrados</p>
                )}
            </div>
        </section>
    );
}

export default MyPets;
