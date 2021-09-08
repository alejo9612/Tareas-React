import { Types } from "../types/Types";

//Acciones que se ejecutarán al momento de ser llamadas en las Paginas
export const setError = (err) => ({
    type: Types.uiSetError,
    payload: err
});

//remueve los errores de pagina
export const removeError = () => ({
    type: Types.uiRemoveError,
});

//cargar el spinin en caso de esperar a la petición para ingresar
export const startLoading  = () => ({
    type: Types.uiStartLoading,
});

//finaliza la solicitud del login al esperar respuesta
export const finishLoading   = () => ({
    type: Types.uiFinishLoading,
});