import api from '../../utils/api'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { styles } from './Home.module.css'


function Home() {
    const [pets, setPet] = useState([])

    useEffect(() => {
        api.get('/pets').then((response) => {
            setPet(response.data.pets)
            console.log(pets)
        })
    }, [])

    return (
        <section>
            <h1>Home</h1>
        </section>
    )
}

export default Home;