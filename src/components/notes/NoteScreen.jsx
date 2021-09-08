import React, { useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NoteAppBar } from './NoteAppBar';
import { useForm } from '../hooks/useForm';
import { activeNote, startDelete } from '../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes);

    //llamamos nuestro hook para manejar todo lo que sea de nuestro formulario
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, id} = formValues;

    //llamamos el hook de referencia el caul nos ayuda a evitar errores en el efecto, es decir en este caso debemos de manejar el efecto paraque nos permita ver el cambio de datos al clickquear y así poder modificar los mismos por lo que será la referencia al id de la nota también
    const activeId = useRef()

    //disparamos el efecto para que nos compare los datos y podamos hacer la modificación de los mismos
    useEffect(() => {
       if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
       }
    }, [note, reset])

    //este 2 efecto lo que hace es que nos cambia de inmediato los cambios desde redux con las acción que disparamos para poder ver los cambios en tiempo real
    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch])

    const handleDelete = () =>{
       dispatch(startDelete(id))
       //console.log(id)
    }


    return (
        <div className="note_main-content">
            <NoteAppBar />

            <div className="notes__content">

                {/* title */}
                <input type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                {/* body */}
                <textarea className="notes__textarea"
                    placeholder="What happened today"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {/* imagen */}
                {
                    note.url &&
                    <div className="notes__image">
                        <img src={note.url}
                            alt="imagen"
                        />
                    </div>
                }
            </div>
            <button className="btn btn-danger"
                    onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
