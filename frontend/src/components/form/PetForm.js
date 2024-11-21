import { useState } from 'react';
import forStyles from './form.module.css';
import Input from './input';

function PetForm(handleSubmit, petData, btnTxt) {
    const [pet, setPet] = useState(petData || {});  
    const [preview, setPreview] = useState([]);
    const colors = ['Preto', 'Branco', 'Cinza', 'Caramelo', 'Mesclado'];

    return (
        <section>
                <h1>Pet form</h1>
        </section>
    );

}

export default PetForm;