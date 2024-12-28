import api from "../../../utils/api"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import styles from "./PetDetails.module.css"

/** hooks */
import useFlashMessage from "../../../hooks/useFlashMessage"

function PetDetails() {
    const [pet, setPet] = useState([])
    const {id} = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    return(
        <>
            {pet.name && (
                <section>
                    <div>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                    </div>
                </section>
            )}
        </>
    )