import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/FileUpload";
import { loadNotes } from "../helpers/LoadNotes";
import { Types } from "../types/Types";

//función a disparar
export const starNewNote = () =>{
    return async (dispatch, getState)=>{
        const {uid} =  getState().auth;
        
        //variable de nueva nota
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        //almacenamos los datos de la base de datos de firestore a una variable para manejarlo
        const database = await db.collection(`${uid}/journal/notes`).add(newNote);
        
        //disparamos la acción que creamos para poder mostrar los datos requeridos
        dispatch(activeNote(database.id, newNote));
        //disparamos la nueva nota para que se muestre al crearla
        dispatch(addNewNote(database.id, newNote));
    }
}

//Creamos la acción que vamos a disparar para poder llevar a cabo la nota y tenerla en el id registrado
export const activeNote = (id, note) => ({
    type: Types.notesActive,
    payload: {
        id,
        ...note
    }
})

//Creamos el refresh instantaneo de la nota que acabamos de crear
export const addNewNote = (id,note) =>({
    type: Types.notesAddNew,
    payload:{
        id, 
        ...note
    }
})

///creo la  acción que me va a disparar una vez tengamos las notas que creo el usuario
export const setNotes = (notes) =>({
    type: Types.notesLoad,
    payload: notes
})

//creo laación a disparar por los datos de cada uid
export const startLoadingNote = (uid) =>{
    return async(dispatch)=>{
        
        //almacenamos lass notas de usuario en una constante
        const notes = await loadNotes(uid);
        //disparamos la acción para poder visualizarlas en redux
        dispatch(setNotes(notes));
    }
}

//Está acción lo que recibe es la nota ya creada o modificada, nos permite guardar el valor que tengamos en la misma para subirlo a firebase
export const startSaveNote = (note) =>{
    return async(dispatch, getState) =>{

        const {uid} = getState().auth;

        //condicionamos para manejar el error de la imgen
        if (!note.url) {
            delete note.url;
        }

        //almacenamos todo el  valor de la nota que necesitamos
        const noteToFirestore = { ...note};
        //eliminamos el id que vendría repetido para no volver a guardarlo dentro de la base
        delete noteToFirestore.id;

        //almacenamos los cambios en la base de datos tomando las referencias que necesitamos
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        //disparamos la funcón para poder refrescar de manera instantanea los datos que requiero
        dispatch(refreshNote(note.id, note));
        Swal.fire('Saved', note.title, 'success');  

    }
}

//me permite refrescar los datos con su cambios sin hacer peticiones
export const refreshNote = (id, note) =>({
    type: Types.notesUpdated,
    payload:{
        id, 
        note:{
            id,
            ...note
        }
    }
});

//me permite subir las imagenes y validarlas de ser necesario
export const starLoadingFile = (file) =>{
    return async(dispatch, getState) =>{
        
        const {active: activeNote} = getState().notes;
        //console.log(activeNote);

        Swal.fire({
            title:'Uploading...',
            text:'Please wait...',
            allowOutsideClick: false,
            didOpen: () =>{
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        //console.log(fileUrl);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();

    }
}

//se elimina los datos discriminados por id de la nota para que no este mas almacenada en la base de datos
export const startDelete = (id) =>{
    return async(dispatch, getState)=>{
        const {uid} = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        //disparamos la ación de eliminar por id y enviamos el mensaje de eliminacción
        dispatch(deleteNote(id));
        Swal.fire('Delete', 'Note Delete..' ,'error'); 
        //console.log(uid)
    }
}

//fucnión de la nota para eliminar por id
export const deleteNote = (id)=>({
    type: Types.notesDelete,
    payload:id
})

//purga de las notas por usuario
export const noteLogout = () => ({
    type:Types.notesLogoutCleaning
})