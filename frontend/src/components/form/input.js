import styles from './input.module.css';

function Input({
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
}) {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value}
                multiple={multiple || undefined}
            />
        </div>
    );
}

export default Input;
