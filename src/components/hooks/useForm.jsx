import { useState } from 'react';


///hook que creamos para poder manejar los forularios que tenemos, es decir login, register, etc
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    //asignamos un valor al nuevo state para eitar errores con el usefect que  utilicemos
    const reset = (newFormState =  initialState) => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];

}