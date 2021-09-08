import {createStore, combineReducers, applyMiddleware, compose} from 'redux'; //llamamos las dependecias
import thunk from 'redux-thunk'; // se instala esta dependencia y llamamos lo que necesitamso de la documentación
import { authReducer } from '../reducers/AuthReducer'; //llamamos el reducer que creamos
import { noteReducer } from '../reducers/NoteReducers';
import { uiReducer } from '../reducers/UiReducer';

//creamos la constante que nos permite visualizar redux  en el navegador, adiccional a ello permite mas argumentos en el store
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//almacenamos en una constante todos los reducer que creamos, ya que se utilizarán mediante el metodo combineReducers
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: noteReducer
});

//creamos la constante que exportaremos ya que es el coreazón del reducer
export const store = createStore(
    reducers,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//lo tomamos del github que nos remite el entorno de desarrollo
    composeEnhancers(
        applyMiddleware(thunk)
    )
);