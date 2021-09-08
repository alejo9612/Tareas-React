import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../actions/ui';
import { starRegisterWhitEmailPasswordName } from '../actions/auth';

export const RegisterScreen = () => {

    ///hook para disparar las acciones
    const dispatch = useDispatch();
    /// nos sirve para seleccionar el stado que obtuvimos de nuestra acción
    //const { msgError } = useSelector(state => state.ui);
    //console.log(msgError);

    //Obtención de datos con nuestro hook de formulario
    const [formValues, handleInputChange] = useForm({
        name: 'Carnaval',
        email: 'carnaval@gmail.com',
        password: '12345678',
        password2: '12345678'
    });

    //desestructuración del mismo
    const { name, email, password, password2 } = formValues;

    //función para obtener los datos
    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(starRegisterWhitEmailPasswordName(email, password, name));
        }

    }

    //función para validar los datos a mostrar
    const isFormValid = (e) => {

        if (name.trim().length === 0) {
            dispatch(setError(Swal.fire('Error', 'Name is required', 'error')));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError(Swal.fire('Error', 'Dont is Email', 'error')));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError(Swal.fire('Error', 'Password should be > 5 please', 'error')));
            return false;
        }

        dispatch(removeError());

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}
                  className="animate__animated animate__fadeIn animate__faster"
            >

                <input className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button type='submit' className="btn btn-primary btn-block mb-5">
                    Register
                </button>

                <Link to="/auth/login"
                    className="link"
                >
                    Already register?
                </Link>
            </form>
        </>
    )
}
