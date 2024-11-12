import { useState, useEffect } from "react";
import styles from './Message.module.css';
import bus from '../../utils/bus';

function Message() {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');  

    useEffect(() => {
        const handleFlash = ({ message, type }) => {
            setVisibility(true);
            setMessage(message);
            setType(type);

            setTimeout(() => {
                setVisibility(false);
            }, 3000);
        };

        bus.addListener('flash', handleFlash);

        return () => {
            bus.removeListener('flash', handleFlash);
        };
        
    }, []);

    return (
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}> 
                {message}
            </div>
        )
    );
}

export default Message;
