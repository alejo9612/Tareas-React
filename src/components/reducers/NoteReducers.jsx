import { Types } from "../types/Types"

const initialState = {
    notes: [],
    active: null
}


export const noteReducer = (state = initialState, action) =>{

    switch (action.type) {

        //llamamos la primera acción que creamos y mostramos los dato relaionados
        case Types.notesActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }

        case Types.notesAddNew:
            return{
                ...state,
                notes:[action.payload, ...state.notes]
            }
        //llamamos el tipo de acción que creamos ara que se nos muestre el estado con toda su información, más nuestro payload de las notas
        case Types.notesLoad:
            //console.log(action.payload)
            return{
                ...state,
                notes: [...action.payload]
            }
        case Types.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case Types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case Types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                notes:[]
            }

        default:
            return state
    }
}   