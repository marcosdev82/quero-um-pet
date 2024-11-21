import { useState } from 'react';
import formStyles from './form.module.css';
import Input from './input';

function PetForm(handleSubmit, petData, btnTxt) {
    const [pet, setPet] = useState(petData || {});  
    const [preview, setPreview] = useState([]);
    const colors = ['Preto', 'Branco', 'Cinza', 'Caramelo', 'Mesclado'];

    function onFileChange(e) {

    }

    function handleChange(e) {

    }

    return <form className={formStyles.form_container} >
        <Input 
            text="Imagens do pet"
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
        />
        <Input 
            text="Nome do pet"
            type="text"
            name="name"
            handleOnChange={handleChange}
            placeholder="Digite o nome"
            value={pet.name || ''}
        />
        <Input 
            text="Nome do pet"
            type="text"
            name="name"
            handleOnChange={handleChange}
            placeholder="Digite o nome"
            value={pet.name || ''}
        />
        <Input 
            text="Idade"
            type="number"
            name="age"
            handleOnChange={handleChange}
            placeholder="Digite a idade"
            value={pet.age || ''}
        />
         <Input 
            text="Peso do pet"
            type="number"
            name="weight"
            handleOnChange={handleChange}
            placeholder="Digite o peso"
            value={pet.weight || ''}
        />
        
        <input type='submit' value='Cadastrar pet'/>

    </form>

}

export default PetForm;