import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
    //console.log(id, date, title, body, url)

    //almacenamos en una constante el funcionamiento de moment
    const noteDate = moment(date);
    
    ///llamamos el dispatch de redux
    const dispatch = useDispatch()

    //almacenamos en una constante los valores que recibimos de los argumentos por default
    const notes = { date, title, body, url };

    const handleEntryClick = () =>{
        //disparamos la acción con los argumentos ya almacenados
        dispatch(activeNote(id, notes))
    }

    return (

        <div className="journal__entry pointer animate__animated animate__backInLeft"
             onClick={handleEntryClick}
        >

            {   
                //si el url existe mostrar img
                url &&
                <div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format("dddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    )
}
