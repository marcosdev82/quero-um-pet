import api from "../../../utils/api"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import styles from "./PetDetails.module.css"

/** hooks */
import useFlashMessage from "../../../hooks/useFlashMessage"

function PetDetails() {
    return(
        <h1>Detalhes do pets</h1>
    )
}

export default PetDetails