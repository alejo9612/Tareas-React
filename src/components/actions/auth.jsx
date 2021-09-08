import Swal from 'sweetalert2';
import { Types } from '../types/Types';
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';


//dunción que se manejará la info que necesitamos para el logueo, dispara las acciones creadas
//logueo a través de correo y el email
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{
        
        //disparamos la acción de logueo
        dispatch(startLoading())

        //confirmamos el logueo por autentificación de password y email
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user})=>{
                //console.log(user);
                //disparamos lo que necesitamos del usuario
                dispatch(
                    login(user.uid, user.displayName)
                )
                
                //disparamos la ación de logueo
                dispatch(finishLoading())
            }).catch(e =>{
                console.log(e)
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error');
            })

        //Prueba de logue al principio para ver que si me toma los datos
        // setTimeout(() => {
        //     dispatch(login(12345, 'Carnaval'));
        // }, 3500);
    }
}

//creación del usuario para poder accceder a la app
export const starRegisterWhitEmailPasswordName = (email, password, name) =>{
    return (dispatch)=>{

        //nos permite la función de crear usuarios
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user})=>{
                //esperamos la los datos que necesitamos del  perfil para obtener su name
                await user.updateProfile({displayName: name});
                //console.log(user);

                //disparamos la función de login con sus respectivos datos
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(e =>{
                console.log(e)
                Swal.fire('Error', e.message, 'error');
            })
    }
}

//logueo a través de correo registrado de google sing in 
export const startGoogleLogin = () =>{
    return (dispatch)=>{

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) =>{
                //console.log(userCred);
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

//funcion que me va a validar el login con sus datos y uid
export const login = (uid, displayName) =>({
    type: Types.login,
    payload:{
        uid,
        displayName
    }
});

//función para deslogar al usuario
export const starLogout = () =>{
    return async (dispatch) =>{
        await firebase.auth().signOut();

        dispatch(logout());
        //disparamos la acción para purga los datos
        dispatch(noteLogout());
    }
}

//función para deslogarnos
export const logout = () => ({
    type: Types.logout
})