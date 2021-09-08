import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
    // prueba de datos ccargados const entries = [1,2,3,4,5];
    
    //llamamos el selector de redux y mostramos las notas que necesitamos
    const {notes} = useSelector(state => state.notes);
    //console.log(notes)


    return (
        <div className="journal__entries">
            {
                //Recorremos las notas y las mostramos en pantalla asignando esto como props
                notes.map(note =>(
                    <JournalEntry 
                        key={note.id}
                        {...note}
                    />
                ))
            }
        </div>
    )
}
