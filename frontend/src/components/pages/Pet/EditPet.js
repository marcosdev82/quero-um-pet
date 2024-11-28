
import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Addpet.module.css'

import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet() {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        api
            .get(`/pets/${id}`, {
                Authorization: `Bearer ${JSON.parse(token)}`
            })
            .then((response) => {
                console.log(response)
                setPet(response.data.pet)
            })
    }, [token, id])

    async function updatePet(pet) {

    }
    
    return (
        <section>
            <div className={styles.add_petheader}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sitema</p>
            </div>
            { pet.name && (
                <PetForm  handleSubmit={updatePet} btnTxt="Atualizar" petData={pet}/>
            )}
        </section>
    )
}

export default EditPet;