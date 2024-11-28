import { useState } from 'react';
import formStyles from './Form.module.css';
import Input from './Input';
import Select from './Select';

function PetForm({ handleSubmit, petData, btnTxt }) {
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]);
    const colors = ['Preto', 'Branco', 'Cinza', 'Caramelo', 'Mesclado'];


    function onFileChange(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            console.error("Nenhum arquivo foi selecionado.");
            return;
        }
        setPreview(files); // Certifique-se de que 'files' é um array de `File` ou `Blob`.
        setPet({ ...pet, images: files });
    }
    

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value });
    }

    function handleColor(e) {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
        
    }   

    function submit(e) {
        e.preventDefault();
        console.log("Dados do pet enviados:", pet);
        handleSubmit(pet);
    }

    return (
        <form className={formStyles.form_container} onSubmit={submit}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                       
                          <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                              key={`${pet.name}+${index}`}
                              onLoad={() => URL.revokeObjectURL(image)}
                          />
                      ))
                    : pet.images &&
                      pet.images.map((image, index) => (
                          <img
                              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                              alt={pet.name || `Imagem ${index}`}
                              key={`${pet.name}+${index}`}
                              onLoad={() => URL.revokeObjectURL(image)}
                          />
                      ))}
            </div>

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
            <input type="submit" value={btnTxt} />
        </form>
    );
}

export default PetForm;
