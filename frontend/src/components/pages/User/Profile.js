import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import styles from './Profile.module.css'
import formStyles from '../../form/form.module.css'
import Input from '../../form/input'
import useFlashMessage from '../../../hooks/useFlashMessage'

function Profile() {

    const [user, setUser ] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

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
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    function handleChange(e) {
        setUser({...user, [e.target.name] : e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e)

        let msgType = 'success'

        const formData = new FormData();

        await Object.keys(user).forEach((key) => formData.append(key, user[key]) )     

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multpart/form-data'
            }, 
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <img 
                    src={preview 
                        ? URL.createObjectURL(preview) 
                        : `${process.env.REACT_APP_API}/images/users/${user.image}`
                    }
                    alt={user.name || 'User Image'} 
                />
                
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
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