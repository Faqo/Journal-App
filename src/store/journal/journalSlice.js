import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving:false,
        messageSaved:'',
        notes:[],
        // active:{
        //     id:'ABC123',
        //     title:'',
        //     body:'',
        //     date:1234567,
        //     imageUrls:[],
        // }
        active:null,
    },
    reducers: {
        savingNewNote: (state)=>{
            state.isSaving = true;
        },
        addNewEmptyNote:(state, action)=>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote:(state, action)=>{
            state.active = action.payload;
        },
        setNotes:(state, action)=>{
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote:(state, action)=>{
            state.isSaving = false;
            state.notes = state.notes.map( note =>{
                if(note.id === action.payload.id){
                    return action.payload;
                } 
                return note;
            });

            //TODO: mostrar que esta actualizado por mensaje
        },
        deleteNoteById:(state, action)=>{

        },
    }
});


export const { 
    savingNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving,
    updateNote, 
    deleteNoteById 
} = journalSlice.actions;