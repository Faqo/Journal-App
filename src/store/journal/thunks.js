import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote } from "./";

export const startNewNote  = () =>{
    return async(dispatch, getState)=>{

        console.log( getState());

        const {uid} = getState().auth;
        // uid 
        const newNote ={
            title:'',
            body:'',
            date:new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${ uid }/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id =newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes= ()=>{
    return async(dispatch, getState) =>{
        const {uid} = getState().auth;

        if(!uid) throw new Error('El UID del usuario no existe');
        
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () =>{
    return async(dispatch, getState)=>{
        dispatch(setSaving());
        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    
        await setDoc(docRef, noteToFirestore, {merge:true})
    
        dispatch(updateNote( note ));
    }
}