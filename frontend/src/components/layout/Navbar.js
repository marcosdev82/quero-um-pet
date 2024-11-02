import { Link } from 'react-router-dom';

import styles from './Navbar.module.css'

import logo from '../../assets/img/logo.png'

function Navbar() {
    return (
       <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt='Quero um pet' />
                <h2>Quero um pet</h2>
            </div>
            <ul>
                <li><Link to="/">Adotar</Link></li>
                <li><Link to="/login">Entrar</Link></li>
                <li><Link to="/register">Cadastrar</Link></li>
            </ul>
       </nav>
    );
}

export default Navbar;
