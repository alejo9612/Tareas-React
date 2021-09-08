import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../actions/auth';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {

    ///hook para disparar las acciones
    const dispatch = useDispatch();
    //hook para seleccionar lo que deseamos ver del state que obtuvimos
    const {loading} = useSelector(state => state.ui)

    ///almacenamos el state y llamamos la funcion necesario
    const [formValues, handleInputChange] = useForm({
        //damos los parametros del state por default
        email: 'carnaval@gmail.com',
        password: '12345678'
    });

    //desestructuramos los datos
    const {email, password} = formValues;

    //creamos lafunción que manejará el  dispacth
    const handleLogin = (e) =>{
        e.preventDefault();
        //console.log(email, password);
        dispatch(startLoginEmailPassword(email, password))
    }

    //evento para disparar acción de login por google
    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin());
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}
                  className="animate__animated animate__fadeIn animate__faster"
            >

                <input className="auth__input"
                    type="text"
                    placeholder="email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />

                <button type='submit' 
                        className="btn btn-primary btn-block"
                        disabled={loading} //deshabilitamos por instantes el button
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div>
                        <div className="google-btn"
                             onClick={handleGoogleLogin}
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                        </div>
                    </div>
                </div>
                <Link to="/auth/register"
                      className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
