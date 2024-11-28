
import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Addpet.module.css'

import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet() {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token'))
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    
    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet: 'pet.name'</h1>
                <p>Depois da edição os dados serão atualizados no sitema</p>
            </div>
        </section>
    )
}

export default EditPet;