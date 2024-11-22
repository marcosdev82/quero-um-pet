import styles from './Select.modules.css';

function Select({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
            {options.map((option)  => (
                <option value={option} id={option} key={option}>
                    {option}
                </option>
            ))}
            </select> 
        </div>
    );
}

export default Select;