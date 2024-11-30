import api from '../../utils/api'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { styles } from './Home.module.css'


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
            <h1>Adote um pet</h1>
            <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            <div>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div>
                            <p>Image do pet</p>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className='bold'>Pesso:</span> {pet.weight}kg
                                {pet.avilable ? (
                                    <Link to={`pet/${pet._id}`} >Mais detalhes</Link>
                                ) : (
                                    <p>Adotado</p>
                                ) } 
                            </p>
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Não há pets cadastrados ou disponíveis nesse momento!</p>
                )}
            </div>
        </section>
    )
}

export default Home;