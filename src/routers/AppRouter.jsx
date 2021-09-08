import React, { useEffect, useState }from 'react';
import {useDispatch} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    //Route,
    Redirect
} from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import {firebase} from '../components/firebase/firebaseConfig';
import { login } from '../components/actions/auth';
import { Loading } from '../components/journal/Loading';
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRoute';
import { startLoadingNote } from '../components/actions/notes';

export const AppRouter = () => {

    ///llamamos el hook dispatcha de redux
    const dispatch = useDispatch();

    //manejamos en un estado elcargado de la página a la cualderiva el login
    const [cheking, setCheking] = useState(true);

    //manejamos en un state el login
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //usamos el hook de efectos, para que seejecuten de manera aurromatica en nuestra aolicación
    useEffect(() => {
        
        //validamos la autentificación con los metodos de firebase
        firebase.auth().onAuthStateChanged( async(user)=>{
            //console.log(user)

            //creamos la condición alternaria para poder darle continuidad a la vista de login
            if (user?.uid) {
                //disparamos la acción del login y cambiamos estado
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true);

                //disparamos la acción para poder visualizarlas en redux
                dispatch(startLoadingNote(user.uid));
            }else{
                setIsLoggedIn(false);
            }
            setCheking(false);
        })

        //creamos las dependencias que tenemos en el array del hook
    }, [dispatch, setCheking, setIsLoggedIn])

    //condiciamos lo que se mostrará mientras cargan los datos
    if (cheking) {
        return (
            <Loading/>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                    />
                    <PrivateRouter exact path="/"
                            isAuthenticated={isLoggedIn}
                            component={JournalScreen}
                    />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
