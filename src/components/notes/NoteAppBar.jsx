import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { starLoadingFile, startSaveNote } from '../actions/notes';

export const NoteAppBar = () => {

    const fecha = new Date().getTime();

    const Today = moment(fecha);


    const dispatch = useDispatch();
    //llamamos elselector de recux
    const {active} = useSelector(state => state.notes)

    const handleSave = () =>{
        //console.log(active)
        //disparamos los cambios que tenemos con sus respectivos cambios
        dispatch(startSaveNote(active));
    }

    const handlePintureClick = () =>{
        document.querySelector('#filePicture').click();
    }

    const handleFileChange = (e) =>{
        //console.log(e.target.files)
        const file = e.target.files[0];

        if (file) {
            dispatch(starLoadingFile(file));
        }
    }

    return (
        <div className="notes__app-bar">
            <span>{Today.format("DD-MM-YYYY")}</span>

            <input id="filePicture"
                   type="file" 
                   name="file"
                   style={{display: 'none'}}
                   onChange={handleFileChange}
            />

            <div>
                <button className="btn"
                        onClick={handlePintureClick}
                >
                    Picture
                </button>
                <button className="btn"
                        onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
