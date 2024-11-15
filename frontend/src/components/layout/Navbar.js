import { Link } from 'react-router-dom';
import { useContext } from 'react';

import styles from './Navbar.module.css'

import logo from '../../assets/img/logo.png'

/** CONTEXT */
import { Context } from './../../context/UserProvider'

function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
       <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt='Quero um pet' />
                <h2>Quero um pet</h2>
            </div>
            <ul>
                <li><Link to="/">Adotar</Link></li>
                {
                    authenticated ? (
                        <>
                            <li><Link to="#" onClick={logout}>Sair</Link></li>
                            <li><Link to="/user/profile">Perfil</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Entrar</Link></li>
                            <li><Link to="/register">Cadastrar</Link></li>
                        </>
                    )
                }
            </ul>
       </nav>
    );
}

export default Navbar;
