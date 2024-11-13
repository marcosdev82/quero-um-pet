import { useState, useContext } from 'react'
import Input from '../../form/input'

import styles from '../../form/Form.module.css'

/** CONTEXT */
import { Context } from '../../../context/UserProvider'

import { Link } from 'react-router-dom'

function Login() {

    function handleChange(e) {

    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form>
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu E-mail"
                    handleOnChange={handleChange} 
                />
                <Input
                    text="Senha"
                    type="Password"
                    name="Password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange} 
                />
                <input type="submit" value="Entrar" />
                <p>
                    Não tem conta? <Link to="/register">Clique aqui.</Link>
                </p>
            </form>
        </section>
    )
}

export default Login;