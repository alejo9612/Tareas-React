import { Types } from "../types/Types";

//Declaración del state que queremos manejar
const initialState = {
    loading: false,
    msgError: null
}

//reducer que nos sirve para manejar el momento en el que nos logamos el loading y también cuando nos registramos el mensaje del error
export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case Types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case Types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        case Types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

