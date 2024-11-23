import { useState } from 'react';
import formStyles from './Form.module.css';
import Input from './Input';
import Select from './Select';

function PetForm(handleSubmit, petData, btnTxt) {
    const [pet, setPet] = useState(petData || {});  
    const [preview, setPreview] = useState([]);
    const colors = ['Preto', 'Branco', 'Cinza', 'Caramelo', 'Mesclado'];

    function onFileChange(e) {

    }

    function handleChange(e) {

    }

    function handleColor(e){

    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return <form className={formStyles.form_container} onSubmit={handleSubmit}>
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
        <Select
            name="color"
            text="Selecione a cor"
            options={colors}
            handleOnChange={handleColor}
            value={pet.color || ''}
        />
        <input type='submit' value={btnTxt}/>

    </form>
}

export default PetForm;