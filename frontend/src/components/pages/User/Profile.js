import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import styles from './Profile.module.css'
import formStyles from '../../form/form.module.css'
import Input from '../../form/input'

function Profile() {

    const [user, setUser ] = useState({});
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {

        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}` 
            }
        }).then((response) =>{
            setUser(response.data)
        })

    },[token])

    function onFileChange(e) {

    }

    function handleChange(e) {

    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                <p>Preview Image</p>
            </div>
            <form className={formStyles.form_container}>
                <Input
                    text="Image"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange} 
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    handleOnChange={handleChange} 
                    placeholder="Digite o seu e-mail"
                    value={ user.email || ''}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    handleOnChange={handleChange} 
                    placeholder="Digite o seu nome"
                    value={ user.name || ''}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    handleOnChange={handleChange} 
                    placeholder="Digite o seu telefone"
                    value={ user.phone || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    handleOnChange={handleChange} 
                    placeholder="Digite o seu telefone"
                    value={ user.password || ''}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    handleOnChange={handleChange} 
                    placeholder="Confirme sua senha"
                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )
}

export default Profile;