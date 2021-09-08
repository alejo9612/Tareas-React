import { db } from "../firebase/firebaseConfig"

//Creamos la constante que me va a traer los datos que tendo en la base de datos de firebase
export const loadNotes = async(uid) => {

    //creo la variable que me los almacena con el metodo de firebase
    const noteSnap =  await db.collection(`${uid}/journal/notes`).get();
    const notes = [];
    //console.log(noteSnap);

    //recorro los datos que me trae con el metodo foreach que trae ya, le asgno el hijo y hago el push para que ingresen en el array creado
    noteSnap.forEach(snapSon =>{
        notes.push({
            id: snapSon.id,
            ...snapSon.data()
        });
    })
    
    //console.log(notes);
    //Returno lo que sea que me traiga la información, ya sea vacio por id de usuario o lo que lleve cada uno de ello   
    return notes;
}