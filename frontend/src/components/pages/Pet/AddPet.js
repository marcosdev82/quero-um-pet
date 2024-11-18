import api from '../../../utils/api'

import styles from './Addpet.module.css'

import { useState } from 'react'

import { redirect } from 'react-router-dom'

/** Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet() {
    return (
        <section className={styles.add_petheader}>
            <div>
                <h1>Cadastre um pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <p>Formulário</p>
        </section>
    )
}

export default AddPet;