
import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Addpet.module.css'

import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet() {
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