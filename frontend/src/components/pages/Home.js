import api from '../../utils/api'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import  styles  from './Home.module.css'

function Home() {
    const [pets, setPet] = useState([])

    useEffect(() => {
        api.get('/pets').then((response) => {
            console.log(response)
            setPet(response.data.pets)
        })
        .catch((error) => {
            console.error("Erro ao buscar os pets:", error);
        });
    }, [])

    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um pet</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 ? (
                    pets.map((pet) => (
                    <div className={styles.pet_card} key={pet._id}>
                        <div
                        className={styles.pet_card_image}
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                        }}
                        ></div>
                        <h3>{pet.name}</h3>
                        <p>
                        <span className="bold">Peso:</span> {pet.weight}kg
                        </p>
                        {pet.available ? (
                        <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
                        ) : (
                        <p className={styles.adopted_text}>Adotado</p>
                        )}
                    </div>
                    ))
                ) : (
                    <p>Não há pets cadastrados ou disponíveis nesse momento!</p>
                )}
                </div>

        </section>
    )
}

export default Home;